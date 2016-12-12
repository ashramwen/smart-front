angular.module('SmartPortal.Secure')

.factory('SessionService', ['localStorageService', '$rootScope', '$q', '$http', 'AppConfig', 'AUTH_EVENTS', 'AppUtils', '$$User', function(localStorageService, $rootScope, $q, $http, AppConfig, AUTH_EVENTS, AppUtils, $$User) {
    var SessionService = {};

    SessionService.setPortalAdmin = function(user){
        localStorageService.set(AppConfig.USER_SESSION, user);
        $rootScope.portalAdmin = user;
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.accessToken;
    };

    SessionService.getPortalAdmin = function(){
        var user = localStorageService.get(AppConfig.USER_SESSION);
        $rootScope.portalAdmin = user;
        return user;
    };

    SessionService.expire = function(){
        $rootScope.portalAdmin = null;
        localStorageService.remove(AppConfig.USER_SESSION);
    };

    SessionService.restore = function(){
        var portalAdmin = localStorageService.get(AppConfig.USER_SESSION);
        // if(portalAdmin){
        //     $rootScope.portalAdmin = new KiiPortalAdmin();

        //     $rootScope.portalAdmin.setAccessToken(portalAdmin._accessToken);
        //     $rootScope.portalAdmin.setTokenType(portalAdmin._tokenType);
        // }
    };

    SessionService.restore();
    return SessionService;
}]);