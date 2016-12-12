'use strict';

angular.module('SmartPortal.Portal', [
    'ngResource',
    'SmartPortal.AppShared'
])

.config(['$resourceProvider', '$httpProvider', function($resourceProvider, $httpProvider) {
    // Don't strip trailing slashes from calculated URLs
    // $resourceProvider.defaults.stripTrailingSlashes = false;
}])

.run(['$http', 'SessionService', function($http, SessionService) {
    var user = SessionService.getPortalAdmin();
    if (user)
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.accessToken;
}]);