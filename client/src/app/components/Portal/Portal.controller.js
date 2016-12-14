'use strict';

angular.module('SmartPortal.Portal')

.controller('PortalController', ['$scope', '$rootScope', '$state', 'AppUtils', 'SessionService', 'PortalService', 'ownership', function($scope, $rootScope, $state, AppUtils, SessionService, PortalService, ownership) {

    /*
     * objects for generating navigations content on left nav column.
     * by George
     */

    $scope.navigateTo = function(stateName, params) {
        $state.go(stateName, _.extend($state.params, params));
    };

    /*
     * initialize
     */
    $scope.portalNavs = PortalService.getPortalNavs();
    $scope.getStateChan = PortalService.getStateChan;
    $scope.getStateDisplayName = PortalService.getStateDisplayName;
    $scope.isActive = PortalService.isActive;
    $scope.credential = SessionService.getPortalAdmin();

    $scope.getFirstChild = function(nav) {
        return _.find(nav.subViews, function(subView) {
            return !subView.hidden;
        });
    };

    $scope.toggleMenu = function() {
        $('.left-side').toggleClass('sidebar-offcanvas');
        $('.right-side').toggleClass('shrink');
        var flag = $('.right-side').hasClass('shrink');
        $scope.$broadcast('toggle-menu', { isShrink: flag });
    };

    $scope.goBack = function() {
        $rootScope.$state.go($rootScope.$state.current.previous, $rootScope.$state.params);
    }

    $scope.logout = function() {
        SessionService.expire();
        $state.go('app.secure');
    };

    $scope.isCreator = ownership.isCreator;
}]);