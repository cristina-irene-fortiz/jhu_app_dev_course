(function () {
  "use strict";

  angular.module("common").service("UserInfoService", UserInfoService);

  function UserInfoService() {
    var service = this;
    var user = null;

    service.saveUser = function (data) {
      user = data;
    };

    service.getUser = function () {
      return user;
    };

    service.hasRegistered = function () {
      return user !== null;
    };
  }
})();
