'use strict';

angular.module('SmartPortal.Portal')
  .controller('ReportingController', ['$scope', '$rootScope', '$state', 'AppUtils', 'ReportingService', 'ReportingTimeOptionService', function($scope, $rootScope, $state, AppUtils, ReportingService, ReportingTimeOptionService) {

    $scope.init = function(){
      $scope.gridsterOpts = ReportingService.gridsterOpts 
      $scope.customChartMap = ReportingService.customChartMap;
      $scope.options = ReportingTimeOptionService.options;
      $scope.selectedOption = $scope.options[0];
      ReportingService.refresh().then(function(charts){
        $scope.charts = charts;
        $scope.queryData();
      });
    };

    $scope.queryData = function(){
      var period = {
        from: $scope.selectedOption.from(),
        to: $scope.selectedOption.to(),
        interval: $scope.selectedOption.interval,
        unit: $scope.selectedOption.unit
      };

      _.each($scope.charts, function(chart){
        chart.options.interval = period.interval;
        chart.options.timeUnit = period.unit;
        chart.setPeriod(period);
        chart.refresh();
      });
    };

    $scope.selectOption = function (option) {
      $scope.selectedOption = option;
      $scope.queryData();
    };

    $scope.selectMethod = function(chart, method){
      chart.currentMethod = method.name;
      method.func(chart.options.query);
      chart.refresh();
    };

    $rootScope.$watch('login', function(newVal){
      $scope.init();
    });

  }]);
