(function() {
    'use strict';

    angular.module('ShoppingListPromiseApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = [ 'ShoppingListService' ];
    function ShoppingListController(ShoppingListService) {
        var list = this;
        list.items = ShoppingListService.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            ShoppingListService.addItem(list.itemName, list.itemQuantity);
        };

        list.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    ShoppingListService.$inject = [ '$q', 'WeightLossFilterService' ];
    function ShoppingListService($q, WeightLossFilterService) {
        var service = this;
        service.items = [];

        service.getItems = function() {
            return service.items;
        };

        service.removeItem = function(itemIndex) {
            service.items.splice(itemIndex, 1);
        };
/* nested
        service.addItem = function(itemName, itemQuantity) {
            var namePromise = WeightLossFilterService.checkName(itemName);

            namePromise.then(
                function(response) {
                    var quantityPromise = WeightLossFilterService.checkQuantity(itemQuantity);

                    quantityPromise.then(
                        function(result) {
                            var item = {
                                name: itemName,
                                quantity: itemQuantity
                            };
                            service.items.push(item);
                        },
                        function(errorResponse) {
                            console.log(errorResponse.message);
                        });
                },
                function(errorResponse) {
                    console.log(errorResponse.message);
                });
        };
*/
/* chained
        service.addItem = function(name, quantity) {
            var promise = WeightLossFilterService.checkName(name);

            promise
                .then(function(response) {
                    return WeightLossFilterService.checkQuantity(quantity);
                })
                .then(function(response) {
                    var item = {
                        name: name,
                        quantity: quantity
                    };
                    service.items.push(item);
                })
                .catch(function(errorResponse) {
                   console.log(errorResponse.message);
                });

        };*/

        service.addItem = function(name, quantity) {
            var namePromise = WeightLossFilterService.checkName(name);
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
            $q.all([namePromise, quantityPromise])
                .then(function(response) {
                    var item = {
                        name: name,
                        quantity: quantity
                    };
                    service.items.push(item);
                })
                .catch(function(errorResponse) {
                    console.log(errorResponse.message);
                });
        };
    }

    WeightLossFilterService.$inject = [ '$q', '$timeout' ];
    function WeightLossFilterService($q, $timeout) {
        var service = this;

        service.checkName = function(name) {
            var deferred = $q.defer();
            var result = {
                message: ""
            };
            $timeout(function() {
                if ( name.toLowerCase().indexOf('cookie') === -1 ) {
                    deferred.resolve(result);
                } else {
                    result.message = "Stay away from cookies, Yaakov!";
                    deferred.reject(result);
                }
            }, 3000);
            return deferred.promise;
        };

        service.checkQuantity = function(quantity) {
            var deferred = $q.defer();
            var result = {
                message: ""
            };
            $timeout(function () {
                if ( quantity < 6 ) {
                    deferred.resolve(result);
                } else {
                    result.message = "That's too much!";
                    deferred.reject(result);
                }
            }, 1000);
            return deferred.promise;
        };
    }
})();
