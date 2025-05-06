describe('SignUpController', function () {
    var $controller, $httpBackend, MenuService, $q, $rootScope, ctrl;
  
    beforeEach(module('public'));
  
    beforeEach(inject(function (_$controller_, _$httpBackend_, _MenuService_, _$q_, _$rootScope_) {
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      MenuService = _MenuService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
  
      ctrl = $controller('SignUpController', {
        MenuService: MenuService,
        UserInfoService: {}, 
        $q: $q
      });
    }));
  
    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should return true for a valid menu item (e.g., L1)', function () {
      var mockMenuData = {
        menu_items: [
          { short_name: "L1", name: "Lo Mein", description: "Delicious noodles." }
        ]
      };
  
      $httpBackend.expectGET("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L.json")
                  .respond(200, mockMenuData);
  
      ctrl.user.menuNumber = "L1";
  
      var result;
      ctrl.validateMenuNumber();
      $httpBackend.flush();
  
      expect(ctrl.menuItemValid).toBe(true);
    });
  
    it('should return false for an invalid menu item (e.g., L99)', function () {
      var mockMenuData = {
        menu_items: []
      };
  
      $httpBackend.expectGET("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L.json")
                  .respond(200, mockMenuData);
  
      ctrl.user.menuNumber = "L99";
  
      ctrl.validateMenuNumber();
      $httpBackend.flush();
  
      expect(ctrl.menuItemValid).toBe(false);
    });
  });
  