angular.module('SmartPortal.Portal')

.factory('MonitorService', ['$rootScope', '$q', 'WebSocketClient', '$$Thing', '$$Monitor', '$$Notice', function($rootScope, $q, WebSocketClient, $$Thing, $$Monitor, $$Notice) {
    var monitorName = 'CP-Demo Monitor';
    var thing = {
        'id': 7174,
        'createDate': 1481783151000,
        'modifyDate': 1481783323000,
        'createBy': '640',
        'modifyBy': '2',
        'vendorThingID': '0806W-W01-O-001',
        'kiiAppID': '192b49ce',
        'type': 'EnvironmentSensor',
        'status': {},
        'fullKiiThingID': '192b49ce-th.f83120e36100-1c9a-6e11-f82c-0d891335',
        'schemaName': 'EnvironmentSensor',
        'schemaVersion': '1',
        'kiiThingID': 'th.f83120e36100-1c9a-6e11-f82c-0d891335',
        'globalThingID': 7174,
        'tags': []
    };

    var monitor = {};
    var emptyMonitor = {
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

    // get msg from websocket
    function updateStatus(statuses) {
        var status;
        for (var key in statuses) {
            if (!statuses.hasOwnProperty(key) || !thing.status.hasOwnProperty(key)) continue;
            status = thing.status[key];
            status.value = statuses[key];
            status.warn = (status.value <= status.lower || status.value >= status.upper);
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
            checkStatus();
            thingCallback && thingCallback.apply(this, [thing]);
        });
        WebSocketClient.subscribe('/socket/users/notices', function(res) {
            console.log('notice', res);
            noticeCallback && noticeCallback.apply(this, [res]);
        });
    }

    // update monitor
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

    // get monitor
    function parseCondition(res) {
        monitor = res;
        if (!res.condition) return;
        monitor.condition = res.condition;
        if (!res.condition.clauses) return;
        var status;
        res.condition.clauses.forEach(function(clause) {
            status = thing.status[clause.field];
            if (!status) return;
            clause.lowerLimit && (status.lower = clause.lowerLimit);
            clause.upperLimit && (status.upper = clause.upperLimit);
            status.warn = (status.value >= status.lower || status.value <= status.upper);
        });
    }

    // show/hide notice on the top of portal
    function checkStatus() {
        var status;
        $rootScope.notice = undefined;
        for (var key in thing.status) {
            status = thing.status[key];
            status.warn = (status.value >= status.lower || status.value <= status.upper);
            status.warn && ($rootScope.notice = status);
        }
    }

    $rootScope.$on('$destroy', function() {
        WebSocketClient.unsubscribeAll();
    });

    var MonitorService = {
        data: function() {
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
                checkStatus();
                defer.resolve(monitor);
            });
            return defer.promise;
        },
        queryMonitor: function(_name) {
            var defer = $q.defer();
            $$Monitor.query({}, { name: monitorName }).$promise.then(function(res) {
                if (res.length > 0) {
                    parseCondition(res[0]);
                    checkStatus();
                    defer.resolve(monitor);
                } else {
                    MonitorService.addMonitor().then(function(res) {
                        monitor = angular.copy(emptyMonitor);
                        monitor.monitorID = res.monitorID;
                        defer.resolve(monitor);
                    });
                }
            });
            return defer.promise;
        },
        addMonitor: function() {
            return $$Monitor.add(emptyMonitor).$promise;
        },
        setMonitor: function() {
            var defer = $q.defer();
            monitor.condition = genCondition();
            checkStatus();
            if (monitor.condition) {
                $$Monitor.update({ id: monitor.monitorID }, monitor).$promise.then(function(res) {
                    defer.resolve(res);
                });
            } else {
                MonitorService.deleteMonitor().then(function() {
                    return MonitorService.addMonitor();
                }).then(function(res) {
                    monitor = angular.copy(emptyMonitor);
                    monitor.monitorID = res.monitorID;
                    defer.resolve(monitor);
                });
            }
            return defer.promise;
        },
        deleteMonitor: function() {
            return $$Monitor.delete({ id: monitor.monitorID }).$promise;
        },
        getNotice: function(queryString) {
            return $$Notice.query(queryString, { from: monitor.name, actionType: 'false2true' }).$promise;
        },
        count: function() {
            return $$Notice.queryCount({}, { from: monitor.name, actionType: 'false2true' }).$promise;
        },
        onThing: function(callback) {
            thingCallback = callback;
        },
        onNotice: function(callback) {
            noticeCallback = callback;
        }
    }
    return MonitorService;
}]);