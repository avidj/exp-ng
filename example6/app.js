(function () {
    'use strict';

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];
    function CounterController($scope) {
        $scope.onceCounter = 0;
        $scope.counter = 0;
        $scope.name = "david";
        $scope.showNumberOfWatchers = function() {
            console.log("# of watchers: " + $scope.$$watchersCount);
        };
        $scope.countOnce = function() {
            $scope.onceCounter = 1;
        };
        $scope.count = function() {
            $scope.counter++;
        }

        // explicitly add a watcher, discouraged
        /*
        $scope.$watch('onceCounter', function(newValue, oldValue) {
            console.log("onceCounter old value: ", oldValue);
            console.log("onceCounter new value: ", newValue);
        });
        $scope.$watch('counter', function(newValue, oldValue) {
            console.log("counter old value: ", oldValue);
            console.log("counter new value: ", newValue);
        });
        */

        // The function should return the name of the propery to watch
        $scope.$watch(function() { // last watcher
            console.log("digest loop fired");
        })
    }
})();