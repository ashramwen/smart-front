'use strict';

angular.module('SmartPortal.Portal')

.controller('MonitoringController', ['$scope', '$state', '$uibModal', 'MonitorService', function($scope, $state, $uibModal, MonitorService) {
    MonitorService.getThing(7810).then(function(res) {
        $scope.thing = res
    });

    // MonitorService.queryAlert();

    MonitorService.on(function(msg) {
        console.log(msg);
    })

    $scope.set = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app-portal-monitormanager-setalert',
            controller: 'AlertController',
            size: 'sm',
            resolve: {
                thing: $scope.thing
            }
        });

        modalInstance.result.then(function() {

        });
    };
}])

.controller('AlertController', ['$scope', '$uibModalInstance', 'thing', function($scope, $uibModalInstance, thing) {

    // close modal
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);