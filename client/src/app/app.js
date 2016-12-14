'use strict'

var MyApp = angular.module('SmartPortal', ['ui.router',
    'SmartPortal.Secure', 'SmartPortal.AppShared', 'SmartPortal.Portal',
    'pascalprecht.translate', 'gridster'
]);

MyApp.constant('AUTH_EVENTS', {
    tokenNotGiven: 'token-not-given',
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'LOGIN_TOKEN_INVALID',
    notAuthorized: 'auth-not-authorized',
})

.config(function($httpProvider, $stateProvider, $urlRouterProvider, $logProvider, $translateProvider) {

    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $logProvider.debugEnabled(false);

    $translateProvider
        .useSanitizeValueStrategy('escapeParameters')
        .translations('en', window.translations.en)
        .translations('cn', window.translations.cn)
        .preferredLanguage('en');

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer super_token';

    $httpProvider.interceptors.push(function($q) {
        return {
            request: function(request) {
                MyApp.utils.doLoading();
                return request;
            },
            response: function(response) {
                MyApp.utils.whenLoaded();
                return response;
            },
            responseError: function(response) {
                MyApp.utils.whenLoaded();
                if (response.status == 401) {
                    //window.location = 'index.html#/app/secure/UserLogin';
                }
                return $q.reject(response);
            }
        };
    });

}).run(
    ['$rootScope', '$state', '$stateParams', 'AppUtils',
        function($rootScope, $state, $stateParams, AppUtils) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            window.state = $state;
            /* =======================================================
             * =======================================================
             * init AppUtils
             * =======================================================
             * =======================================================
             */
            MyApp.utils = AppUtils;

            $rootScope.$on('$stateChangeStart', function(evt, to, params) {
                if (to.redirectTo) {
                    evt.preventDefault();
                    $state.go(to.redirectTo, params, { location: 'replace' })
                }
            });

            window.ECharts = echarts;
            _.noConflict();

            KiiReporting.KiiQueryConfig.setConfig({
                token: 'Bearer super_token',
                site: 'http://121.199.7.69',
                port: 9200,
                timeStampField: 'state.date',
                chartOptions: {
                    title: {
                        show: false
                    },
                  _backButton: {
                    style: {
                      position: 'absolute',
                      top: '-10px',
                      left: '10px'
                    },
                    cssClass: "btn btn-warning",
                    text: '返回'
                  },
                  xAxis: {
                    splitNumber: 5,
                    splitLine: {
                        show: true
                    }
                  },
                  yAxis: {
                    splitNumber: 5,
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: false,
                        length: 0
                    }
                  },
                  grid: {
                    show: false
                  },
                  color: ['#ffa976', '#f88dc7', '#9ae05a', '#53d9db', '#9ee6f6', '#ecc475', '#7abce2', '#dee27a', '#927ae2', '#7ae2c3', '#ffdcc7', '#7986CB', '#B0BEC5', '#8D6E63', '#BA68C8', '#FF7043']
                }
            });
              
        }
    ]
);