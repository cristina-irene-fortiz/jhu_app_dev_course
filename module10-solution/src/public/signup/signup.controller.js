(function () {
    "use strict";
    
    console.log("Test SignUpController loaded!");
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    

    
    SignUpController.$inject = ['MenuService', 'UserInfoService', '$q'];
    function SignUpController(MenuService, UserInfoService, $q) {
      var signUpCtrl = this;
    
      signUpCtrl.user = {};
      signUpCtrl.menuItemValid = null;
      signUpCtrl.saved = false;
    
      signUpCtrl.submit = function () {
        validateMenuNumber(signUpCtrl.user.menuNumber).then(function (isValid) {
          if (isValid) {
            UserInfoService.saveUser(signUpCtrl.user);
            signUpCtrl.saved = true;
            signUpCtrl.menuItemValid = true;
          } else {
            signUpCtrl.menuItemValid = false;
            signUpCtrl.saved = false;
          }
        });
      };
    
      signUpCtrl.validateMenuNumber = function () {
        validateMenuNumber(signUpCtrl.user.menuNumber).then(function (isValid) {
          signUpCtrl.menuItemValid = isValid;
        });
      };
    
      function validateMenuNumber(shortName) {
        if (!shortName || shortName.length < 2) {
          return $q.resolve(false);
        }
    
        var category = shortName.charAt(0).toUpperCase();
        var index = parseInt(shortName.substring(1)) - 1;
    
        return MenuService.getMenuItems(category).then(function (data) {
          return data.menu_items && data.menu_items[index] ? true : false;
        }).catch(function () {
          return false;
        });
      }
    }
    
    })();
    