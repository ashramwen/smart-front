'use strict';

angular.module('SmartPortal.Portal')


.controller('AlertController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {
    var data = MonitorService.data();

    $scope.status = data.thing.status;
    // $scope.monitor = data.monitor;

    $scope.reset = function(status) {
        status.lower = undefined;
        status.upper = undefined;
    }

    $scope.update = function() {
        MonitorService.setMonitor().then(function(res) {
            $scope.close();
        });
    }

    // close modal
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);