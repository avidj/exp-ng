/**
 * Created by david on 03.01.17.
 */
(function() {
    'use strict';

    angular.module('CheckOffShoppingList', [])
        .controller('ToBuyList', ToBuyList)
        .controller('AlreadyBoughtList', AlreadyBoughtList)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config)
    ;

    Config.$inject = [ 'ShoppingListServiceProvider' ];
    function Config(ShoppingListServiceProvider) {
    }

    ToBuyList.$inject = [ 'ShoppingListService' ];
    function ToBuyList(ShoppingListService) {
        var toBuyList = this;
        toBuyList.items = ShoppingListService.getToBuyList();
        toBuyList.buy = function(index) {
            ShoppingListService.buy(index);
        }
    }

    AlreadyBoughtList.$inject = [ 'ShoppingListService' ];
    function AlreadyBoughtList(ShoppingListService) {
        var alreadyBoughtList = this;
        alreadyBoughtList.items = ShoppingListService.getBoughtList();
    }

    function ShoppingListService() {
        var service = this;
        var toBuyList = [
            {
                name: "Cookies",
                quantity: 10
            },
            {
                name: "Chocolate",
                quantity: 5
            },
            {
                name: "Salad",
                quantity: 2
            },
            {
                name: "Beer",
                quantity: 10
            },
            {
                name: "Cheese",
                quantity: 2
            }
        ];
        var boughtList = [];
        service.getToBuyList = function() {
            return toBuyList;
        };
        service.getBoughtList = function() {
            return boughtList;
        }
        service.buy = function(index) {
            var item = toBuyList[index];
            boughtList.push(item);
            toBuyList.splice(index, 1);
        };
    }

    function ShoppingListServiceProvider() {
        var provider = this;
        provider.defaults = {};
        provider.$get = function() {
            var service = new ShoppingListService();
            return service;
        }
    }
})();