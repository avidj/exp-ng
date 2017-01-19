(function() {
    'use strict';

    angular.module('ShoppingListComponentApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .component('shoppingList', {
            templateUrl: 'shoppingList.html',
            controller: ShoppingListComponentController,
            bindings: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            }
        })
    ;

    function ShoppingListComponentController() {
        var $ctrl = this;

        $ctrl.cookiesInList = function() {
            for ( var i = 0; i < $ctrl.items.length; i++ ) {
                var name = $ctrl.items[i].name;
                if ( name.toLowerCase().indexOf("cookie") !== -1 ) {
                    return true;
                }
            }
            return false;
        };

        $ctrl.remove = function(myIndex) {
            // calls the referenced method!
            $ctrl.onRemove({ indexInHtml: myIndex });
        }
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
