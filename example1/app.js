/**
 * Created by david on 18.12.16.
 */
(function () { // using the iffe protects us from bleeding things into scope
    'use strict';

    angular.module('myFirstApp', []) // no dependencies
        .controller('MyFirstController', function($scope) {
            $scope.name = "David";
            $scope.sayHello = function() {
                return "Hello World";
            }
        });
})(); // immediately invoked function expression (iffe)