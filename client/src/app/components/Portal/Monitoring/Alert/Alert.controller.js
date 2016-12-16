'use strict';

angular.module('SmartPortal.Portal')


.controller('AlertController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {
    var data = MonitorService.get();

    $scope.status = data.thing.status;
    $scope.monitor = data.monitor;

    $scope.reset = function(status) {
        status.lower = null;
        status.upper = null;
    }

    $scope.change = function(s) {
        var a = 1;
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