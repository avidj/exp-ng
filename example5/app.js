/**
 * Created by david on 25.12.16.
 */
(function() {
    'use strict';

    angular.module('FilterApp', [])
        .controller('FilterController', FilterController)
        .filter('holiday', HolidayFilter)
        .filter('truth', TruthFilter);

    FilterController.$inject = ['$scope', 'holidayFilter'];
    function FilterController($scope, stateFilter) {
        $scope.stateOfBeing = "job";
        $scope.name = "David";
        $scope.switchState = function() {
            if ( $scope.state == "holiday" ) {
                $scope.state = "job";
            } else {
                $scope.state = "holiday";
            }
        }
        $scope.sayMessage = function () {
            var msg = "David is on the job";
            return msg;
        };
        $scope.sayHolidayMessage = function() {
            var msg = "David is on the job";
            msg = stateFilter(msg);
            return msg;
        };
    }

    function HolidayFilter() {
        return function(input) {
            input = input || "";
            input = input.replace("job", "holiday");
            return input;
        }
    }

    function TruthFilter() {
        return function(input, target, replace) {
            input = input || "";
            input = input.replace(target, replace);
            return input;
        }
    }

})();
