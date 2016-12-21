'use strict';

angular.module('SmartPortal.Portal')

.controller('MonitoringController', ['$scope', '$uibModal', 'MonitorService', function($scope, $uibModal, MonitorService) {
    MonitorService.checkConnection().then(function(res) {
        return MonitorService.getThing();
    }).then(function(res) {
        $scope.thing = res;
        return MonitorService.queryMonitor();
    });

    MonitorService.onThing(function(msg) {
        // console.log(msg);
    });

    $scope.setAlert = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/components/Portal/Monitoring/Alert/Alert.html',
            controller: 'AlertController',
            windowClass: 'app-portal-monitoring-alert'
        });

        modalInstance.result.then(function() {

        });
    };

    $scope.history = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            templateUrl: 'app/components/Portal/Monitoring/History/History.html',
            controller: 'HistoryController',
            windowClass: 'center-modal app-portal-monitoring-history'
        });

        modalInstance.result.then(function() {

        });
    }
}]);