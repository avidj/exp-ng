(function() {
    'use strict';

    angular.module('ChineseMenuChoice', [])
        .controller('ChineseMenuController', ChineseMenuController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
              items: '<',
              onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'menu',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var menu = this;

    }

    ChineseMenuController.$inject = [ 'MenuSearchService' ];
    function ChineseMenuController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";

        menu.narrowItDown = function() {
            var menuItemsPromise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
            menuItemsPromise
                .then(function(response) {
                    menu.found = response;
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

        menu.removeItem = function(index) {
            menu.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = [ '$http', 'ApiBasePath' ];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            var menuItemsPromise = service.getMenuItems();
            return menuItemsPromise
                .then(function(response) {
                    var found = [];
                    if ( searchTerm.trim().length === 0 ) {
                        return found;
                    }
                    var items = response.data.menu_items;
                    for ( var i = 0; i < items.length; i++ ) {
                        if ( items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) {
                            found.push(items[i]);
                        }
                    }
                    return found; // the then-function returns a promise wrapping this
                });
        };

        service.getMenuItems = function() {
            var response = $http(
                { url: ( ApiBasePath + '/menu_items.json' ) }
            );
            return response;
        };
    }
})();
