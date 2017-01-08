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
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink
        };
        return ddo;
    }

    function ShoppingListDirectiveController() {
        var list = this;

        list.cookiesInList = function () {
            for (var i = 0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        };
    }


    function ShoppingListDirectiveLink(scope, element, attrs, controller) {
        console.log("Link scope is: ", scope);
        console.log("Controller instance is: ", controller);
        console.log("Element is: ", element);

        scope.$watch('list.cookiesInList()', function(newValue, oldValue) {
            console.log("Old value: ", oldValue);
            console.log("New value: ", newValue);

            if ( newValue ) {
                displayCookieWarning();
            } else {
                removeCookieWarning();
            }
        });

        function displayCookieWarning() {
            // Using angular jqLite
            // var warningElem = element.find("div");
            // console.log(warningElem);
            // warningElem.css('display', 'block');

            // if jQuery included before Angular
            var warningElem = element.find("div.error");
            warningElem.slideDown(900);
        }

        function removeCookieWarning() {
            // Using angular jqLite
            // var warningElem = element.find("div");
            // console.log(warningElem);
            // warningElem.css('display', 'none');
            var warningElem = element.find("div.error");
            warningElem.slideUp(900);
        }
    }

    ShoppingListController.$inject = [ 'ShoppingListFactory' ];
    function ShoppingListController(ShoppingListFactory) {
        var viewList = this;
        var shoppingList = ShoppingListFactory();

        viewList.items = shoppingList.getItems();
        var origTitle = "Shopping List #1";
        viewList.title = origTitle + " (" + viewList.items.length + " items)";

        viewList.itemName = "";
        viewList.itemQuantity = "";

        viewList.addItem = function() {
            shoppingList.addItem(viewList.itemName, viewList.itemQuantity);
            viewList.title = origTitle + " (" + viewList.items.length + " items)";
        };
        viewList.removeItem = function(index) {
            console.log("this is: ", this);
            this.lastRemoved = "Last item removed was: " + this.items[index].name;
            shoppingList.removeItem(index);
            viewList.title = origTitle + " (" + viewList.items.length + " items)";
        }
    }

    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];
        service.getItems = function() {
            return items;
        };
        service.removeItem = function(index) {
            items.splice(index, 1);
        };
        service.addItem = function(name, quantity) {
            if ( ( maxItems === undefined ) ||
                ( items.length < maxItems ) ) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                items.push(item);
            } else {
                throw new Error("maxItems reached");
            }
        };
    }

    function ShoppingListFactory() {
        var factory = function(maxItems) {
            return new ShoppingListService(maxItems);
        };
        return factory;
    }
})();
