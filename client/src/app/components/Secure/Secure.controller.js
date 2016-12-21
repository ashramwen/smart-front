'use strict';

angular.module('SmartPortal.Secure')

.controller('SecureController', ['$scope', '$rootScope', '$state', 'AppUtils', 'SecurityService', 'SessionService', function($scope, $rootScope, $state, AppUtils, SecurityService, SessionService) {
    $scope.login = function(credentials) {
        AppUtils.showLoading();

        SecurityService.login(credentials).then(function(portalAdmin) {
            SessionService.setPortalAdmin(portalAdmin);
            // $state.go('app.portal.Welcome');
            AppUtils.hideLoading();
        }, function(error) {
            console.log(error);
            AppUtils.hideLoading();
        });
    };

    $scope.login();
}]);