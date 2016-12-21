'use strict';

angular.module('SmartPortal.Portal')

.controller('HistoryController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {
    var data = MonitorService.data();
    var size = 10;

    $scope.currentPage = 1;
    $scope.init = function() {
        getNotices();
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

    $scope.pageChanged = function(currentPage) {
        $scope.currentPage = currentPage;
        // console.log('Page changed to: ' + $scope.currentPage);
        getNotices();
    };

    // close
    $scope.close = function() {
        $uibModalInstance.close();
    }

    function getNotices() {
        $scope.notices = [];
        var _pager = ($scope.currentPage - 1) * 10 + '/10';
        MonitorService.getNotice({ pager: _pager }).then(function(res) {
            parseAlerts(res);
        });

        MonitorService.count().then(function(res) {
            $scope.count = res.recordCount;
            // $scope.count = 100;
        });
    }

    function parseAlerts(alerts) {
        $scope.notices = [];
        alerts.forEach(function(alert) {
            var monitor = alert.data.monitor;
            var clauses = monitor.condition.clauses;
            var currStatus = alert.data.currStatus;

            var _status = [];

            for (var key in currStatus) {
                var clause = clauses.find(function(o) {
                    return (o.field === key) && (currStatus[key] >= o.lowerLimit || currStatus[key] <= o.upperLimit);
                });
                if (!clause) continue;
                _status.push({
                    name: key,
                    display: data.thing.status[key].display,
                    value: currStatus[key]
                });
            }

            if (_status.length) {
                $scope.notices.push({
                    date: currStatus.date,
                    status: _status
                })
            }
        });
        // console.log($scope.notices);

        // for test
        // for (var i = 0; i < 10; i++) {
        //     $scope.notices.push(angular.copy($scope.notices[0]));
        // }
        // $scope.notices = [angular.copy($scope.notices[0]), $scope.notices[0]];
        // console.log($scope.notices);
    }
}]);