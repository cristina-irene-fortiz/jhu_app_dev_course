(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchItems = "";
        $scope.message = "";
        $scope.messageStyle = {};

        $scope.checkLunch = function () {
            if (!$scope.lunchItems.trim()) {
                $scope.message = "Please enter data first";
                $scope.messageStyle = { "color": "red" };
                return;
            }

            let items = $scope.lunchItems.split(',')
                .map(item => item.trim())
                .filter(item => item.length > 0);

            if (items.length === 0) {
                $scope.message = "Please enter data first";
                $scope.messageStyle = { "color": "red" };
            } else if (items.length <= 3) {
                $scope.message = "Enjoy!";
                $scope.messageStyle = { "color": "green" };
            } else {
                $scope.message = "Too much!";
                $scope.messageStyle = { "color": "green" };
            }
        };
    }
})();
