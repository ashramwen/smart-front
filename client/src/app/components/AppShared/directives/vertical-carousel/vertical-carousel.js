angular.module('SmartPortal.AppShared')

.directive('verticalCarousel', ['$compile', '$interval', '$timeout', function($compile, $interval, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/AppShared/directives/vertical-carousel/vertical-carousel.html',
        scope: {
            items: '=',
            interval: '='
        },
        link: function(scope, element, attr) {
            var interval = Number.isInteger(scope.interval) ? scope.interval : 3000;
            var firstElement = element.find('li:first');
            var hgt = firstElement.height() +
                parseInt(firstElement.css('paddingTop'), 10) + parseInt(firstElement.css('paddingBottom'), 10) +
                parseInt(firstElement.css('marginTop'), 10) + parseInt(firstElement.css('marginBottom'), 10);

            function moving() {
                var elem = element.find('li:first');
                elem.addClass('delete');
                $timeout(function() {
                    scope.items.push(angular.copy(scope.items[0]));
                    scope.items.splice(0, 1);
                }, 600);
            }
            var timer = null;
            var watcher = scope.$watch('items', function(newValue, oldValue) {
                if (!newValue || newValue.length <= 1) {
                    $interval.cancel(timer);
                    timer = null;
                } else if (timer === null) {
                    timer = $interval(moving, interval);
                }
            });
            scope.$on('$destroy', function() {
                if (timer) {
                    $interval.cancel(timer);
                    timer = null;
                }
                watcher();
            });
        }
    }
}]);