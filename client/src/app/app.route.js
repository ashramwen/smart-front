'use strict';

angular.module('SmartPortal')

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '',
            templateUrl: 'app/app.html',
            controller: 'AppController',
            abstract: true
        })
        .state('app.secure', {
            url: '/Secure',
            templateUrl: 'app/components/Secure/Secure.html',
            controller: 'SecureController'
        })
        .state('app.portal', {
            url: '/Portal',
            templateUrl: 'app/components/Portal/Portal.html',
            controller: 'PortalController'
        });

    $urlRouterProvider.otherwise('Secure');
});