(function() {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    MenuCategoriesController.$inject = [ 'MenuCategoriesService' ];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();

        promise
            .then(function(response) {
                menu.categories = response.data;
            })
            .catch(function(error) {
               console.log("Something went terribly wrong.");
            });

        menu.logMenuItems = function(category) {
            var promise = MenuCategoriesService.getMenuForCategory(category);

            promise
                .then(function(response) {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                })
        };
    };

    /*
    MenuCategoriesService.$inject = [ '$q', '$http', 'ApiBasePath' ];
    function MenuCategoriesService($q, $http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function() {
            var deferred = $q.defer();
            $http(
                { url: ApiBasePath + '/categories.json' }
            ).then(
                function success(response) {
                    deferred.resolve(response);
                },
                function error(response) {
                    deferred.error(response)
                });
            return deferred.promise;
        };

        service.getMenuForCategory = function(shortName) {
            var deferred = $q.defer();
            $http(
                {
                    url: ApiBasePath + '/menu_items.json',
                    params: { category: shortName }
                }
            ).then(
                function success(response) {
                    deferred.resolve(response);
                },
                function error(response) {
                    deferred.error(response);
                }
            )
            return deferred.promise;
        }
    };
    */

    MenuCategoriesService.$inject = [ '$http', 'ApiBasePath' ];
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function() {
            var response = $http(
                { url: (ApiBasePath + '/categories.json') }
            )
            return response;
        };

        service.getMenuForCategory = function(shortName) {
            var response = $http(
                {
                    url: (ApiBasePath + '/menu_items.json'),
                    params: { category: shortName }
                }
            );
            return response;
        }
    };
})();