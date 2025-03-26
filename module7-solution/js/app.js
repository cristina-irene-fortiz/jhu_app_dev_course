(function () {
    'use strict';
  
    angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
      .filter('angularDollars', AngularDollarsFilter);
  
    // To Buy Controller List
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var toBuy = this;
  
      toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  
      toBuy.buyItem = function (index) {
        ShoppingListCheckOffService.buyItem(index);
      };
    }
  
    // Already Bought Controller List
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var bought = this;
  
      bought.items = ShoppingListCheckOffService.getBoughtItems();
    }
  
    // Service
    function ShoppingListCheckOffService() {
      var service = this;
  
      var toBuyItems = [
        { name: "cookies", quantity: 10, pricePerItem: 2 },
        { name: "milk", quantity: 1, pricePerItem: 3 },
        { name: "apples", quantity: 5, pricePerItem: 1.5 },
        { name: "bread", quantity: 2, pricePerItem: 2.5 },
        { name: "coffee", quantity: 1, pricePerItem: 10 }
      ];
  
      var boughtItems = [];
  
      service.buyItem = function (index) {
        var item = toBuyItems.splice(index, 1)[0];
        boughtItems.push(item);
      };
  
      service.getToBuyItems = function () {
        return toBuyItems;
      };
  
      service.getBoughtItems = function () {
        return boughtItems;
      };
    }
  
    // Custom Angular Filter
    function AngularDollarsFilter() {
      return function (input) {
        var num = parseFloat(input);
        return isNaN(num) ? "$$$0.00" : "$$$" + num.toFixed(2);
      };
    }
  
  })();
  