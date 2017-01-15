(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
        .directive('foundItems', foundItems);


    function foundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.dataFound = false;
        controller.hasError = false;

        controller.search = function() {
            if (controller.searchTerm !== undefined && controller.searchTerm !== "") {
                document.getElementById('loaderContainer').style.display = "block";

                var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

                promise.then(function(response) {
                    controller.hasError = false;
                    controller.dataFound = true;
                    controller.list = response;
                    document.getElementById('loaderContainer').style.display = "none";
                })
                    .catch(function(error) {
                        controller.hasError = true;
                        controller.dataFound = false;
                        controller.errorMessage = MenuSearchService.getErrorMessage();
                        document.getElementById('loaderContainer').style.display = "none";
                    });
            } else {
                controller.hasError = true;
                controller.dataFound = false;
                controller.list = [];
                controller.errorMessage = "Error! Please include a search input";
            }
        }

        controller.removeItem = function(itemIndex) {
            controller.list.splice(itemIndex, 1);
        };
    }



    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var errorMessage = "";

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ApiBasePath + "menu_items.json"
            }).then(function successCallback(response) {
                errorMessage = "";
                return service.getMatchedItemsArray(searchTerm, response.data.menu_items);

            }, function errorCallback(response) {
                errorMessage = "ERROR: " + response.status + " " + response.statusText;
            });
        }

        service.getMatchedItemsArray = function(searchTerm, data) {
            var searchTerms = searchTerm.trim().split(" ");
            var foundItems = [];


            for (var i = 0; i < data.length; i++) {
                if (service.isAnyKeywordMatched(searchTerms, data[i])) {
                    foundItems.push(data[i]);
                }
            }
            return foundItems;
        }

        service.isAnyKeywordMatched = function(searchTerms, singleData) {
            for (var i = 0; i < searchTerms.length; i++) {
                if (singleData.description.indexOf(searchTerms[i]) === -1) {
                    return false;
                }
            }
            return true;
        }

        service.getErrorMessage = function() {
            if (errorMessage == "") {
                return false;
            } else {
                return errorMessage;
            }
        }
    }

})();
