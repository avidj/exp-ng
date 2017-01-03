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

    }

    AlreadyBoughtList.$inject = [ 'ShoppingListService' ];
    function AlreadyBoughtList(ShoppingListService) {

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