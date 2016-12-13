'use strict';

angular.module('SmartPortal.Portal')
  .controller('ReportingController', ['$scope', '$rootScope', '$state', 'AppUtils', 'ReportingService',function($scope, $rootScope, $state, AppUtils, ReportingService) {
    
    var from = new Date();
    var to = new Date();

    from.setDate(from.getDate() - 200);

    $scope.defaultTime = {
      from: from,
      to: to
    };

    $scope.period = {
      from: $scope.defaultTime.from,
      to: $scope.defaultTime.to
    };

    $scope.init = function(){
      $scope.gridsterOpts = ReportingService.gridsterOpts 
      $scope.customChartMap = ReportingService.customChartMap;
      ReportingService.refresh().then(function(charts){
        $scope.charts = charts;
        _.each($scope.charts, function(chart){
          chart.setPeriod($scope.period);
          chart.refresh();
        });
      });
    };

    $scope.onPeriodChange = function(period){
      $scope.period.from = period.from;
      $scope.period.to = period.to;
    };

    $scope.queryData = function(){
      _.each($scope.charts, function(chart){
        chart.setPeriod($scope.period);
        chart.refresh();
      });
    };

    $rootScope.$watch('login', function(newVal){
      $scope.init();
    });

  }]);
