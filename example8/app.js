(function () {
    'use strict';

    angular.module('BindingApp', [])
        .controller('BindingController', BindingController);

    BindingController.$inject = ['$scope', '$timeout'];
    function BindingController($scope, $timeout) {
        $scope.firstName = "David";
        //$scope.fullName = ""; // the watcher is removed by ng after first update
        $scope.showNumberOfWatchers = function() {
            console.log("# of watchers: ", $scope.$$watchersCount);
        };
        $scope.setFullName = function() {
            $scope.fullName = $scope.firstName + " " + "Kensche";
        };
        $scope.logFirstName = function() {
            console.log("First name is: ", $scope.firstName);
        };
        $scope.logFullName = function() {
            console.log("Full name is: ", $scope.fullName);
        }
    }
})();