(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['UserInfoService', 'MenuService', '$q'];
    function MyInfoController(UserInfoService, MenuService, $q) {
      var myInfoCtrl = this;
    
      myInfoCtrl.user = UserInfoService.getUser();
      myInfoCtrl.favoriteItem = null;
      myInfoCtrl.notRegistered = !myInfoCtrl.user;
    
      if (myInfoCtrl.user) {
        var shortName = myInfoCtrl.user.menuNumber;
        var category = shortName.charAt(0).toUpperCase();
        var index = parseInt(shortName.substring(1)) - 1;
    
        MenuService.getMenuItems(category).then(function (data) {
          if (data.menu_items && data.menu_items[index]) {
            myInfoCtrl.favoriteItem = data.menu_items[index];
          }
        }).catch(function () {
          myInfoCtrl.favoriteItem = null;
        });
      }
    }
    
    })();
    