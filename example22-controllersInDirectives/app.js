(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingList);

    function ShoppingList() {
        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                list: '=myList',
                title: '@title'
            }
        };
        return ddo;
    }

    ShoppingListController.$inject = [ 'ShoppingListFactory' ];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();
        var origTitle = "Shopping List #1";
        list.title = origTitle + " (" + list.items.length + " items)";

        list.itemName = "";
        list.itemQuantity = "";
        list.addItem = function() {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + " (" + list.items.length + " items)";
        };
        list.removeItem = function(itemIndex) {
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + " (" + list.items.length + " items)";
        }
    };

    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];

        service.addItem = function(itemName, itemQuantity) {
            if ( ( maxItems === undefined ) ||
                ( ( maxItems !== undefined ) && ( items.length < maxItems ) ) ) {
                var newItem = {
                    name: itemName,
                    quantity: itemQuantity
                };
                items.push(newItem);
            } else {
                throw new Error("Max items(" + maxItems + ") reached.");
            }
        };

        service.removeItem = function(itemIndex) {
            items.splice(itemIndex, 1);
        }

        service.getItems = function() {
            return items;
        };
    }

    function ShoppingListFactory() {
        var factory = function(maxItems) {
            return new ShoppingListService(maxItems);
        }
        return factory;
    }

})();
