/**
 * Created by david on 26.12.16.
 */
(function() {
    'use strict';

    var shoppingList1 = [
        "Milk", "Donuts", "Cookies"
    ];

    var shoppingList2 = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        }

    ];

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = [ '$scope' ];
    function ShoppingListController($scope) {
        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;
        $scope.addNewItem = function() {
            var newItem = {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            };
            $scope.shoppingList2.push(newItem);
        }
    };


})();
