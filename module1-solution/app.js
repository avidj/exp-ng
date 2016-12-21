/**
 * Created by david on 21.12.16.
 */
(function() {
    'use strict';

    angular.module("MenuApp", [])
        .controller("MenuController", MenuController);

    MenuController.$inject = ['$scope', '$filter'];
    function MenuController($scope, $filter) {
        $scope.menu = '';
        $scope.message = '';
        $scope.checkMenu = function () {
            $scope.message = message($scope.menu);
        };

        function message(menu) {
            if ( !menu || menu.length == 0 ) {
                return "Please enter data first";
            }
            var items = menu.split(",");
            var menuIsFine = items.length < 4;
            if ( menuIsFine ) {
                return "Enjoy!";
            } else {
                return "Too much!";
            }
        }
    };

})();
