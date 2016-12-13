'use strict';

angular.module('SmartPortal.Portal')

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app.portal.MonitorManager.Monitoring', {
            url: '',
            templateUrl: 'app/components/Portal/MonitorManager/Monitoring/Monitoring.html',
            controller: 'MonitoringController',
            stateName: 'monitorManager.monitoring'
        })
        .state('app.portal.MonitorManager.History', {
            url: '/History',
            templateUrl: 'app/components/Portal/MonitorManager/History/History.html',
            controller: 'HistoryController',
            stateName: 'monitorManager.history',
            previous: 'app.portal.MonitorManager.Monitoring'
        });
});