(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingListDirective);

    function ShoppingListDirective() {
        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                myTitle: '@title',
                badRemove: '=',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function ShoppingListDirectiveController() {
        var list = this;
        list.cookiesInList = function() {
            for ( var i=0; i < list.items.length; i++ ) {
                var name = list.items[i].name;
                if ( name.toLowerCase().indexOf("cookie") !== -1 ) {
                    return true;
                }
            }
            return false;
        };
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
            console.log("'this' is: ", this);
            this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            this.title = origTitle + " (" + list.items.length + " items)";
        };
    }

    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];
        service.getItems = function() {
            return items;
        };
        service.removeItem = function(index) {
            items.splice(index, 1);
        }
        service.addItem = function(name, quantity) {
            if ( ( maxItems === undefined ) ||
                (items.length < maxItems ) ) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                items.push(item);
            } else {
                throw new Error("Max items (" + maxItems +") reached!");
            }
        }
    }

    function ShoppingListFactory() {
        var factory = function(maxItems) {
            return new ShoppingListService(maxItems);
        };
        return factory;
    }
})();
