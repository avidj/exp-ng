(function() {
    'use strict';

    angular.module('ChineseMenuChoice', [])
        .controller('ChineseMenuController', ChineseMenuController)
        .service('MenuService', MenuService)
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

    ChineseMenuController.$inject = [ 'MenuService' ];
    function ChineseMenuController(MenuService) {
        var menu = this;
        menu.searchTerm = "";
        menu.items = [];

        var categoriesPromise = MenuService.getMenuCategories();
        categoriesPromise
            .then(function(response) {
                menu.categories = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });


        menu.narrowItDown = function() {
            var menuItemsPromise = MenuService.getMenuItems();
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

    MenuService.$inject = [ '$http', 'ApiBasePath' ];
    function MenuService($http, ApiBasePath) {
        var service = this;
        service.getMenuCategories = function() {
            var response = $http(
                { url: ( ApiBasePath + '/categories.json' ) }
            );
            return response;
        };
        service.getMenuItems = function() {
            var response = $http(
                { url: ( ApiBasePath + '/menu_items.json' ) }
            );
            return response;
        };
    }
})();
