(function () {
  'use strict';
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);
  
  // Controller
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
  
    ctrl.narrowItDown = function () {
      if (!ctrl.searchTerm) {
        ctrl.found = [];
        ctrl.message = "Nothing found";
        return;
      }
  
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
      .then(function (items) {
        ctrl.found = items || [];   
  
        if (ctrl.found.length === 0) {
          ctrl.message = "Nothing found";
        } else {
          ctrl.message = "";
        }
      })
      .catch(function (error) {
        console.error("Something went wrong:", error);  
        ctrl.found = [];
        ctrl.message = "Nothing found";
      });
    };
  
    ctrl.removeItem = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };
  }
  
  // Service
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
  
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
      }).then(function (response) {
        var allItems = [];
  
        for (var category in response.data) {
          if (response.data.hasOwnProperty(category)) {
            var menuItems = response.data[category].menu_items;
            if (menuItems) {
              allItems = allItems.concat(menuItems);
            }
          }
        }
  
        var foundItems = [];
  
        // Filter items safely
        for (var i = 0; i < allItems.length; i++) {
          if (allItems[i].description &&
              allItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(allItems[i]);
          }
        }
  
        return foundItems;
      });
    };
  }
  
  // Directive
  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
  
    return ddo;
  }
  
  function FoundItemsDirectiveController() {
    var list = this;
  }
  
  })();
  