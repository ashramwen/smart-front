'use strict';

angular.module('SmartPortal.Portal')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app.portal.Monitoring', {
            url: '/Monitoring',
            templateUrl: 'app/components/Portal/Monitoring/Monitoring.html',
            controller: 'MonitoringController',
            stateName: 'monitoring'
        })
        .state('app.portal.Reporting', {
            url: '/Reporting',
            controller: 'ReportingController',
            templateUrl: 'app/components/Portal/Reporting/Reporting.html',
            stateName: 'reporting',
        })
        .state('app.portal.Welcome', {
            url: '/Welcome',
            templateUrl: 'app/components/Portal/Welcome/Welcome.html',
            controller: 'WelcomeController',
            stateName: 'welcome'
        });
}]);