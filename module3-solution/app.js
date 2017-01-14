(function() {
    'use strict';

    angular.module('ChineseMenuChoice', [])
        .controller('ChineseMenuController', ChineseMenuController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            /*
             scope: {
             items: '<',
             myTitle: '@title',
             onRemove: '&'
             },
             controller: FoundItemsDirectiveController,
             controllerAs: 'menu',
             bindToController: true
             */
        };
        /*
         var ddo = {
         templateUrl: 'foundItems.html',
         scope: {
         foundItems: '<',
         //                myTitle: '@title',
         onRemove: '&'
         },
         controller: FoundItemsDirectiveController,
         controllerAs: 'menu',
         bindToController: true,
         //            link: ShoppingListDirectiveLink,
         //            transclude: true
         };
         */
        return ddo;
    }

    ChineseMenuController.$inject = [ 'MenuSearchService' ];
    function ChineseMenuController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";
        menu.items = [];

        menu.narrowItDown = function() {
            var menuItemsPromise = MenuSearchService.getMenuItems();
            menuItemsPromise
                .then(function(response) {
                    var items = response.data.menu_items;
                    var searchTerm = menu.searchTerm.toLowerCase();
                    menu.found = [];
                    for ( var i = 0; i < items.length; i++ ) {
                        if ( items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) {
                            menu.found.push(items[i]);
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
    }

    MenuSearchService.$inject = [ '$http', 'ApiBasePath' ];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMenuItems = function() {
            var response = $http(
                { url: ( ApiBasePath + '/menu_items.json' ) }
            );
            return response;
        };
    }
/*
    MenuSearchService.$inject = [ '$q', '$http', 'ApiBasePath' ];
    function MenuSearchService($q, $http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            var deferred = $q.defer();
            var menuItemsPromise = service.getMenuItems();
            menuItemsPromise
                .then(
                    function success(response) {
                        searchTerm = searchTerm.toLowerCase();
                        var items = response.data.menu_items;
                        var found = [];
                        for ( var i = 0; i < items.length; i++ ) {
                            if ( items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) {
                                found.push(items[i]);
                            }
                        }
                        deferred.resolve(found); // the then-function returns a promise wrapping this
                    },
                    function error(response) {
                        console.log(error);
                    })
                .catch(function(error) {
                    console.log(error);
                });
            return deferred.promise;
        }

        service.getMenuItems = function() {
            var response = $http(
                { url: ( ApiBasePath + '/menu_items.json' ) }
            );
            return response;
        };
    }
*/
})();
