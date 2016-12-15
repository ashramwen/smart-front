'use strict';

angular.module('SmartPortal.Portal')

.controller('MonitoringController', ['$scope', '$state', '$uibModal', 'MonitorService', function($scope, $state, $uibModal, MonitorService) {
    MonitorService.getThing(7810).then(function(res) {
        $scope.thing = res
    });

    MonitorService.queryAlert();

    MonitorService.onThing(function(msg) {
        // console.log(msg);
    });

    $scope.set = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/components/Portal/Monitoring/Alert/Alert.html',
            controller: 'AlertController',
            windowClass: 'center-modal app-portal-monitoring-alert',
            resolve: {
                thing: $scope.thing
            }
        });

        modalInstance.result.then(function() {

        });
    };
}]);