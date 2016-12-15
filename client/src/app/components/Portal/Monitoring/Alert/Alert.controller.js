'use strict';

angular.module('SmartPortal.Portal')


.controller('AlertController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {

    // close modal
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);