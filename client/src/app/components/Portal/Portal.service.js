'use strict';

angular.module('SmartPortal.Portal')

.factory('PortalService', ['AppUtils', '$state', 'WebSocketClient', function(AppUtils, $state, WebSocketClient) {

    var PortalService = {};

    /**
     * get state display name
     * @param  {[type]} stateName [description]
     * @return {[type]}           [description]
     */
    PortalService.getStateDisplayName = function(stateName) {
        return $state.get(stateName).getName();
    }

    /**
     * get states chan for navigation map on portal top navigation bar
     * @param  {[type]} currentState [description]
     * @return {[type]}              [description]
     */
    PortalService.getStateChan = function(currentState) {
        var stateChan = [];
        stateChan.push(currentState);

        var statePointer = currentState;

        while (statePointer.previous) {
            statePointer = $state.get(statePointer.previous);
            stateChan.push(statePointer);
        }
        stateChan.reverse();
        return stateChan;
    };

    /**
     * if given state name is in involved state chan
     * @param  {[type]}  stateName [description]
     * @return {Boolean}           [description]
     */
    PortalService.isActive = function(stateName) {
        var stateChan = PortalService.getStateChan($state.current);
        var thisState = $state.get(stateName);
        return stateChan.indexOf(thisState) > -1;
    }

    PortalService.getPortalNavs = function() {
        return [{
            name: 'monitorManager',
            state: $state.get('app.portal.MonitorManager'),
            icon: 'fa-tv'
        }, {
            name: 'reporting',
            state: $state.get('app.portal.Reporting'),
            icon: 'fa-area-chart'
        }];
    }

    return PortalService;
}])

.factory('ownership', ['$rootScope', function($rootScope) {
    return {
        isCreator: function(obj) {
            return (obj.createBy == $rootScope.credential.id)
        }
    };
}]);