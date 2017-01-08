(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
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

    ShoppingListController1.$inject = [ 'ShoppingListFactory' ];
    function ShoppingListController1(ShoppingListFactory) {
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

    ShoppingListController2.$inject = [ 'ShoppingListFactory' ];
    function ShoppingListController2(ShoppingListFactory) {
        var list = this;
        var shoppingList = ShoppingListFactory(3);
        var origTitle = "Shopping List #2";
        list.items = shoppingList.getItems();

        list.title = origTitle + " (" + list.items.length + " items)";

        list.itemName = "";
        list.itemQuantity = "";
        list.addItem = function() {
            try {
                shoppingList.addItem(list.itemName, list.itemQuantity);
                list.title = origTitle + " (" + list.items.length + " items)";
            } catch ( error ) {
                list.errorMessage = error.message;
            }
        }
        list.removeItem = function(itemIndex) {
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + " (" + list.items.length + " items)";
        }
    }

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
