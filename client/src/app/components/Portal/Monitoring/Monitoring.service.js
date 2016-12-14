angular.module('SmartPortal.Portal')

.factory('MonitorService', ['$rootScope', '$q', 'WebSocketClient', '$$Thing', '$$Monitor', 'RuleService', function($rootScope, $q, WebSocketClient, $$Thing, $$Monitor, RuleService) {
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

    function parseStatus(statuses) {
        if (statuses) {
            dirt.forEach(function(o) {
                delete statuses[o];
            });
        }

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

    var thingCallback = null;
    var noticeCallback = null;
    var destination = '/topic/' + thing.kiiAppID + '/' + thing.kiiThingID;

    WebSocketClient.isConnected ? subscribe() : $rootScope.$on('stomp.connected', subscribe);

    function subscribe() {
        WebSocketClient.subscribe(destination, function(msg) {
            thing.status = parseStatus(msg.state);
            thingCallback && thingCallback.apply(this, [thing]);
        });
        WebSocketClient.subscribe('/socket/users/notices', function(res) {
            console.log('notice', res);
            noticeCallback && noticeCallback.apply(this, [res]);
        });
    }

    $rootScope.$on('$destroy', function() {
        WebSocketClient.unsubscribeAll();
    });

    return {
        getThing: function(_id) {
            var defer = $q.defer();
            $$Thing.get({ globalThingID: _id }).$promise.then(function(res) {
                res.status = parseStatus(res.status);
                thing = res;
                defer.resolve(res);
            }, function(err) {
                console.log('get thing error:', err);
                thing.status = parseStatus(thing.status);
                defer.resolve(thing);
            });
            return defer.promise;
        },
        getAlert: function(_id) {
            return $$Monitor.get({ id: _id }).$promise;
        },
        queryAlert: function(_name) {
            return $$Monitor.query({}, { name: thing.vendorThingID }).$promise;
        },
        setAlert: function() {
            var _data = {
                name: thing.vendorThingID,
                things: [thing.vendorThingID],
                enable: true
            };
            return $$Monitor.add({}, _data).$promise;
        },
        getHistory: function() {},
        getCount: function() {},
        onThing: function(callback) {
            thingCallback = callback;
        },
        onNotice: function(callback) {
            noticeCallback = callback;
        }
    }
}])

.factory('RuleService', function() {

    function Rule(property) {
        this._property = property;
        this.displayName = property.displayName;
        this.enumType = property.enumType;
        this.type = property.type;

        this.propertyName = property.propertyName;
        this.update(property);
    }

    Rule.prototype.update = function(_property) {
        if (!_property.enumType && (_property.type === 'int' || _property.type === 'float')) {
            this.displayValue = _property.value;
        } else {
            var _displayValue = _property.options.find(function(o) { return o.value === _property.value }.bind(this));
            this.displayValue = _displayValue ? _displayValue.text : _property.value;
        }
        this.expression = _property.expression ? _property.expression : 'eq';
        this.value = _property.value;
    }

    Rule.prototype.toClause = function() {
        var clause = null;
        switch (this.expression) {
            case 'gt':
                clause = {
                    type: 'range',
                    field: this.propertyName,
                    lowerLimit: this.value,
                    lowerIncluded: false
                };
                break;
            case 'gte':
                clause = {
                    type: 'range',
                    field: this.propertyName,
                    lowerLimit: this.value
                }
                break;
            case 'lt':
                clause = {
                    type: 'range',
                    field: this.propertyName,
                    upperLimit: this.value,
                    upperIncluded: false
                }
                break;
            case 'lte':
                clause = {
                    type: 'range',
                    field: this.propertyName,
                    upperLimit: this.value
                }
                break;
            default:
                clause = {
                    type: 'eq',
                    field: this.propertyName,
                    value: this.value
                }
                break;
        }
        return clause;
    }

    Rule.fromClause = function(_clause, _property) {
        _property = angular.copy(_property);
        if (_clause.type === 'eq') {
            _property.value = _clause.value;
            _property.expression = _clause.type;
        } else if (_clause.hasOwnProperty('lowerIncluded')) {
            _property.value = _clause.lowerLimit;
            _property.expression = 'gt';
        } else if (_clause.hasOwnProperty('upperIncluded')) {
            _property.value = _clause.upperLimit;
            _property.expression = 'lt';
        } else if (_clause.hasOwnProperty('lowerLimit')) {
            _property.value = _clause.lowerLimit;
            _property.expression = 'gte';
        } else {
            _property.value = _clause.upperLimit;
            _property.expression = 'lte';
        }
        return new Rule(_property);
    }

    return {
        newRule: function(_property) {
            return new Rule(_property);
        },
        fromClause: Rule.fromClause
    }
});