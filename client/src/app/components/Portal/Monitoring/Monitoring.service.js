angular.module('SmartPortal.Portal')

.factory('MonitorService', ['$rootScope', '$q', 'WebSocketClient', '$$Thing', '$$Monitor', '$$Notice', function($rootScope, $q, WebSocketClient, $$Thing, $$Monitor, $$Notice) {
    var thing = {
        'id': 7174,
        'createDate': 1481783151000,
        'modifyDate': 1481783323000,
        'createBy': '640',
        'modifyBy': '2',
        'vendorThingID': '0806W-W01-O-001',
        'kiiAppID': '192b49ce',
        'type': 'EnvironmentSensor',
        'fullKiiThingID': '192b49ce-th.f83120e36100-1c9a-6e11-f82c-0d891335',
        'schemaName': 'EnvironmentSensor',
        'schemaVersion': '1',
        'kiiThingID': 'th.f83120e36100-1c9a-6e11-f82c-0d891335',
        'globalThingID': 7174,
        'tags': []
    };

    var monitorID = '6f7c3190-c293-11e6-a9c1-00163e02138f';

    var monitor = {
        'monitorID': '6f7c3190-c293-11e6-a9c1-00163e02138f',
        'name': 'CP-Demo Monitor',
        'things': ['0806W-W01-O-001'],
        'enable': true,
        'additions': {}
    };

    var mapping = {
        'HUM': { display: 'Humidity', unit: '%', min: 0, max: 100 },
        'HCHO': { display: 'TVOC', unit: 'ppm', min: 0, max: 50 },
        'PM25': { display: 'PM2.5', unit: 'ppm', min: 0, max: 1000 },
        'CO2': { display: 'CO2', unit: 'ppm', min: 400, max: 10000 },
        'PM10': { display: 'PM10', unit: 'ppm', min: 0, max: 1000 },
        'CO': { display: 'CO', unit: 'ppm', min: 0, max: 1000 },
        'TEP': { display: 'Temperature', unit: '℃', min: -20, max: 50 }
    };

    var dirt = ['date', 'target'];

    // from thing API
    function parseStatus(res) {
        thing = res;
        if (!thing.status) return;
        dirt.forEach(function(o) {
            delete thing.status[o];
        });

        for (var key in thing.status) {
            if (!thing.status.hasOwnProperty(key)) continue;
            var map = mapping[key];
            if (map) {
                thing.status[key] = Object.assign({ name: key, value: thing.status[key] }, map);
            } else {
                delete thing.status[key];
            }
        }
    }

    // from websocket
    function updateStatus(statuses) {
        for (var key in statuses) {
            if (!statuses.hasOwnProperty(key) || !thing.status.hasOwnProperty(key)) continue;
            thing.status[key].value = statuses[key];
        }
    }

    var thingCallback = null;
    var noticeCallback = null;
    var destination = '/topic/' + thing.kiiAppID + '/' + thing.kiiThingID;

    WebSocketClient.isConnected() ? subscribe() : $rootScope.$on('stomp.connected', subscribe);

    function subscribe() {
        WebSocketClient.subscribe(destination, function(msg) {
            // console.log('websocket:', msg.state);
            updateStatus(msg.state);
            thingCallback && thingCallback.apply(this, [thing]);
        });
        WebSocketClient.subscribe('/socket/users/notices', function(res) {
            console.log('notice', res);
            noticeCallback && noticeCallback.apply(this, [res]);
        });
    }

    function genCondition() {
        var _clauses = [];
        Object.keys(thing.status).forEach(function(key) {
            var status = thing.status[key];
            if (status.lower) {
                _clauses.push({
                    type: 'range',
                    field: status.name,
                    lowerLimit: status.lower
                });
            }
            if (status.upper) {
                _clauses.push({
                    type: 'range',
                    field: status.name,
                    upperLimit: status.upper
                });
            }
        });
        if (!_clauses.length) return;
        return {
            type: 'or',
            clauses: _clauses
        };
    }

    function parseCondition(res) {
        if (!res.condition) return;
        monitor.condition = res.condition;
        if (!res.condition.clauses) return;
        res.condition.clauses.forEach(function(clause) {
            if (!thing.status[clause.field]) return;
            clause.lowerLimit && (thing.status[clause.field].lower = clause.lowerLimit);
            clause.upperLimit && (thing.status[clause.field].upper = clause.upperLimit);
        });
    }

    $rootScope.$on('$destroy', function() {
        WebSocketClient.unsubscribeAll();
    });

    return {
        get: function() {
            return {
                thing: thing,
                monitor: monitor
            };
        },
        getThing: function() {
            var defer = $q.defer();
            $$Thing.get({ globalThingID: thing.id }).$promise.then(function(res) {
                parseStatus(res);
                defer.resolve(thing);
            }, function(err) {
                console.log('get thing error:', err);
                defer.resolve(thing);
            });
            return defer.promise;
        },
        getMonitor: function() {
            var defer = $q.defer();
            $$Monitor.get({ id: monitor.monitorID }).$promise.then(function(res) {
                parseCondition(res);
                defer.resolve(monitor);
            });
            return defer.promise;
        },
        queryMonitor: function(_name) {
            return $$Monitor.query({}, { name: thing.vendorThingID }).$promise;
        },
        setMonitor: function() {
            monitor.condition = genCondition();
            return $$Monitor.update({ id: monitor.monitorID }, monitor).$promise;
        },
        getNotice: function() {
            return $$Notice.query({}, { from: monitor.name }).$promise;
        },
        count: function() {
            return $$Notice.queryCount({}, { from: monitor.name }).$promise;
        },
        onThing: function(callback) {
            thingCallback = callback;
        },
        onNotice: function(callback) {
            noticeCallback = callback;
        }
    }
}]);