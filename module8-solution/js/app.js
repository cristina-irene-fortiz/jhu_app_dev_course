(function () {
  'use strict';
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);
  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
  
    ctrl.narrowItDown = function () {
      if (!ctrl.searchTerm) {
        ctrl.found = [];
        return;
      }
  
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
      .then(function (items) {
        ctrl.found = items;
        if (ctrl.found.length === 0) {
          ctrl.message = "Nothing found";
        } else {
          ctrl.message = "";
        }
      });
    };
  
    ctrl.removeItem = function (itemIndex) {
      ctrl.found.splice(itemIndex, 1);
    };
  }
  
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
  
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
      }).then(function (response) {
        var allItems = response.data.menu_items;
        var foundItems = [];
  
        for (var i = 0; i < allItems.length; i++) {
          if (allItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(allItems[i]);
          }
        }
        return foundItems;
      });
    };
  }
  
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
  