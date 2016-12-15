'use strict';

angular.module('SmartPortal.Portal')

.controller('HistoryController', ['$scope', '$uibModalInstance', 'MonitorService', function($scope, $uibModalInstance, MonitorService) {
    $scope.read = function(notice) {

    }

    $scope.readAll = function() {

    }

    // go back
    $scope.close = function() {
        $uibModalInstance.close();
    }
}]);