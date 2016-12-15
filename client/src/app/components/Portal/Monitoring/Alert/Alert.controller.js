'use strict';

angular.module('SmartPortal.Portal')


.controller('AlertController', ['$scope', '$uibModalInstance', 'thing', function($scope, $uibModalInstance, thing) {

    // close modal
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);