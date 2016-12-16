'use strict';

angular.module('SmartPortal.Portal')

.controller('HistoryController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {
    var data = MonitorService.get();
    $scope.notices = [];
    MonitorService.getNotice().then(function(res) {
        res.forEach(function(notice) {
            for (var key in notice.currStatus) {

            }
        });
    });

    MonitorService.count().then(function(res) {

    });

    // go back
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);