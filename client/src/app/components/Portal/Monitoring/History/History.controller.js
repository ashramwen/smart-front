'use strict';

angular.module('SmartPortal.Portal')

.controller('HistoryController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {
    var data = MonitorService.data();
    var size = 10;

    $scope.current = 1;
    $scope.init = function() {
        $scope.notices = [];
        var _pager = ($scope.current - 1) * 10 + 1 + '/10';
        MonitorService.getNotice({ pager: _pager }, { from: data.monitor.name, actionType: 'false2true' }).then(function(res) {
            parseAlerts(res);
        });

        MonitorService.count().then(function(res) {
            $scope.count = res.recordCount;
            // $scope.count = 100;
        });
    }

    $scope.collapse = function(notice, index) {
        if (notice.status.length <= 1) return;
        if (notice.isCollapsed) {
            notice.isCollapsed = false;
        } else {
            $scope.notices.forEach(function(n, i) {
                n.isCollapsed = (i === index);
            });
        }
    }

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    // close
    $scope.close = function() {
        $uibModalInstance.close();
    }

    function parseAlerts(alerts) {

        $scope.notices = alerts.map(function(alert) {
            // notice.monitor
            var monitor = alert.data.monitor;
            var clauses = monitor.condition.clauses;
            var currStatus = alert.data.currStatus;

            var _status = [];

            for (var key in currStatus) {
                var clause = clauses.find(function(o) { return o.field === key; });
                if (!clause) continue;
                // if (currStatus[key] <= clause.lowerLimit || currStatus[key] >= clause.lowerLimit) {
                _status.push({
                    name: key,
                    display: data.thing.status[key].display,
                    value: currStatus[key]
                });
                // }
            }

            return {
                date: currStatus.date,
                status: _status
            }
        });
        for (var i = 0; i < 10; i++) {
            $scope.notices.push(angular.copy($scope.notices[0]));
        }
        // $scope.notices = [angular.copy($scope.notices[0]), $scope.notices[0]];
        console.log($scope.notices);
    }
}]);