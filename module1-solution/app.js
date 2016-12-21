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
        $scope.status = 'enjoy';
        $scope.checkMenu = function () {
            $scope.status = status($scope.menu);
            $scope.message = message($scope.menu);
        };

        function status(menu) {
            if ( !menu || menu.length == 0 ) {
                return "invalid";
            }
            return "valid";
        }

        function message(menu) {
            if ( !menu || menu.length == 0 ) {
                return "Please enter data first";
            }
            var items = menu.split(",");
            items = items.filter(function(item) { return item.length > 0 });
            var menuIsFine = items.length < 4;
            if ( menuIsFine ) {
                return "Enjoy!";
            } else {
                return "Too much!";
            }
        }
    };

})();
