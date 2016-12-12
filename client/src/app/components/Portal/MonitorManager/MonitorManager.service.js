angular.module('SmartPortal.Portal')

.factory('MonitorService', ['$q', 'WebSocketClient', '$$Thing', function($q, WebSocketClient, $$Thing) {
    function parseStatus(statuses) {
        var dirt = ['date', 'target'];
        if (statuses) {
            dirt.forEach(function(o) {
                delete statuses[o];
            });
        }
        var mapping = {
            'HUM': 'Humidity',
            'HCHO': 'TVOC',
            'PM25': 'PM2.5',
            'CO2': 'CO2',
            'PM10': 'PM10',
            'CO': 'CO',
            'TEP': 'Temperature'
        }
        statuses = Object.keys(statuses).map(function(key, index) {
            if (mapping[key]) {
                return {
                    name: key,
                    display: mapping[key],
                    value: statuses[key]
                }
            }
        });
        return statuses;
    }

    return {
        getThing: function(id) {
            var defer = $q.defer();
            $$Thing.get({ globalThingID: 7810 }).$promise.then(function(res) {
                res.status = parseStatus(res.status);
                defer.resolve(res);
            });
            return defer.promise;
        }
    }
}]);