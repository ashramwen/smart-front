'use strict';

angular.module('SmartPortal.Portal')

.controller('MonitoringController', ['$scope', '$state', '$uibModal', 'MonitorService', function($scope, $state, $uibModal, MonitorService) {
    MonitorService.getThing(7810).then(function(res) {
        $scope.thing = res
    });
}])

.controller('AlertController', ['$scope', '$uibModalInstance', 'thing', function($scope, $uibModalInstance) {

    // close modal
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);