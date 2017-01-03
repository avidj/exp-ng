(function () {
    'use strict';

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];
    function CounterController($scope, $timeout) {
        $scope.counter = 0;
        $scope.showNumberOfWatchers = function() {
            console.log("# of watchers: " + $scope.$$watchersCount);
        };

        // Best solution, angular-specific service
        $scope.count = function() {
            $timeout(function () {
                $scope.counter++;
                console.log("counter incremented")
            }, 2000);
        };


        /*
        // Better
        $scope.count = function() {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.counter++;
                    console.log("counter incremented")
                });
            }, 2000);

        }
        */
        /*
        // Possible but discouraged
        $scope.count = function() {
            setTimeout(function() {
                $scope.counter++;
                console.log("counter incremented")
                $scope.$digest(); // tell angular to digest the change
            }, 2000);

        }
        */
    }
})();