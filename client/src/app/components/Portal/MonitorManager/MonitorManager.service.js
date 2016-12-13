angular.module('SmartPortal.Portal')

.factory('MonitorService', ['$rootScope', '$q', 'WebSocketClient', '$$Thing', '$$Monitor', function($rootScope, $q, WebSocketClient, $$Thing, $$Monitor) {
    var thing = {
        'id': 7810,
        'vendorThingID': '0806W-W01-O-001',
        'kiiAppID': '493e83c9',
        'type': 'EnvironmentSensor',
        'status': {
            'date': 1481525315000,
            'HUM': 63.2,
            'HCHO': 0,
            'PM25': 5,
            'CO2': 1516,
            'PM10': 10,
            'CO': 0.16,
            'TEP': 25.2,
            'target': 'aba700e36100-011a-6e11-230c-038b629d'
        },
        'fullKiiThingID': '493e83c9-th.aba700e36100-011a-6e11-230c-038b629d',
        'schemaName': 'EnvironmentSensor',
        'schemaVersion': '1',
        'kiiThingID': 'th.aba700e36100-011a-6e11-230c-038b629d',
        'tags': [],
        'globalThingID': 7810
    };

    function parseStatus(statuses) {
        var dirt = ['date', 'target'];
        if (statuses) {
            dirt.forEach(function(o) {
                delete statuses[o];
            });
        }
        var mapping = {
            'HUM': { display: 'Humidity', unit: '%', min: 0, max: 100 },
            'HCHO': { display: 'TVOC', unit: 'ppm', min: 0, max: 50 },
            'PM25': { display: 'PM2.5', unit: 'ppm', min: 0, max: 1000 },
            'CO2': { display: 'CO2', unit: 'ppm', min: 400, max: 10000 },
            'PM10': { display: 'PM10', unit: 'ppm', min: 0, max: 1000 },
            'CO': { display: 'CO', unit: 'ppm', min: 0, max: 1000 },
            'TEP': { display: 'Temperature', unit: '℃', min: -20, max: 50 }
        };
        statuses = Object.keys(statuses).map(function(key, index) {
            var map = mapping[key];
            if (mapping[key]) {
                return Object.assign({
                    name: key,
                    value: statuses[key]
                }, map);
            }
        });
        return statuses;
    }

    function subscribe(callback) {
        var destination = '/topic/' + thing.kiiAppID + '/' + thing.kiiThingID;
        WebSocketClient.subscribe(destination, function(msg) {
            $rootScope.$apply(function() {
                callback.apply(_client, msg);
            });
        });
    }

    return {
        getThing: function(id) {
            var defer = $q.defer();
            $$Thing.get({ globalThingID: 7810 }).$promise.then(function(res) {
                res.status = parseStatus(res.status);
                thing = res;
                defer.resolve(res);
            });
            return defer.promise;
        },
        getAlert: function() {},
        setAlert: function() {
            var _data = {
                name: thing.vendorThingID,
                things: [thing.vendorThingID],
                enable: true,
                condition: {
                    type: 'or',
                    // clauses: []
                }
            };
            $$Monitor.add({}, _data);
        },
        getHistory: function() {},
        getCount: function() {},
        on: function(callback) {
            if (WebSocketClient.isConnected) {
                subscribe(callback);
            } else {
                $rootScope.$on('stomp.connected', function() {
                    subscribe(callback);
                });
            }
        }
    }
}]);