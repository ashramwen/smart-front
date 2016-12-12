'use strict';

angular.module('SmartPortal.AppShared', ['ngAnimate', 'ngSanitize', 
    'ui.bootstrap', 'LocalStorageModule', 'ui.router', 
  'SmartPortal.Secure'])
.constant('AppConfig', {
    StoragePrefix: 'SmartPortal',
    USER_SESSION: 'USER_SESSION'
})
.config(function(localStorageServiceProvider, AppConfig) {
    localStorageServiceProvider
    .setPrefix(AppConfig.StoragePrefix)
    .setStorageType('localStorage')
    .setStorageCookie(30, '/')
    .setNotify(true, true);
});