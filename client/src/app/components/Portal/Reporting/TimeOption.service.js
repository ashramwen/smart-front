angular.module('SmartPortal.Portal')
  .factory('ReportingTimeOptionService', ['$q', '$timeout', '$$User', 'AppUtils', function($q, $timeout, $$User, AppUtils){
    var OptionService = {
      options: [{
        text: 'Last 5 Minutes',
        interval: 30,
        unit: 's',
        style: 'a',
        from: function(){
          var t = new Date;
          t.setMinutes(t.getMinutes()-5);
          return t;
        },
        to: function(){
          return new Date;
        }
      }, {
        text: 'Last 15 Minutes',
        interval: 1,
        unit: 'm',
        style: 'b',
        from: function(){
          var t = new Date;
          t.setMinutes(t.getMinutes()-15);
          return t;
        },
        to: function(){
          return new Date;
        }
      }, {
        text: 'Last Hour',
        interval: 1,
        unit: 'm',
        style: 'c',
        from: function(){
          var t = new Date;
          t.setHours(t.getHours()-1);
          return t;
        },
        to: function(){
          return new Date;
        }
      }, {
        text: 'Last Day',
        interval: 30,
        unit: 'm',
        style: 'd',
        from: function(){
          var t = new Date;
          t.setDate(t.getDate()-1);
          return t;
        },
        to: function(){
          return new Date;
        }
      }, {
        text: 'Last Week',
        interval: 1,
        unit: '',
        style: 'e',
        from: function(){
          var t = new Date;
          t.setDate(t.getDate()-7);
          return t;
        },
        to: function(){
          return new Date;
        }
      }, {
        text: 'Last Month',
        interval: 1,
        unit: 'd',
        style: 'f',
        from: function(){
          var t = new Date;
          t.setMonth(t.getMonth()-1);
          return t;
        },
        to: function(){
          return new Date;
        }
      }, {
        text: 'Last Quarter',
        interval: '1',
        unit: 'd',
        style: 'g',
        from: function(){
          var t = new Date;
          t.setMonth(t.getMonth()-3);
          return t;
        },
        to: function(){
          return new Date;
        }
      }]
    };

    return OptionService;
  }]);