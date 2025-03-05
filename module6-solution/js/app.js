(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchItems = "";
        $scope.message = "";
        $scope.messageStyle = {};
        $scope.gifUrl = "";  
        $scope.borderClass = ""; 

        $scope.checkLunch = function () {
            if (!$scope.lunchItems.trim()) {
                $scope.message = "Please enter data first";
                $scope.messageStyle = { "color": "red" };
                $scope.borderClass = "border-danger"; 
                $scope.gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA3M2ltcmNud2RneW82dzliODQ1anZtMmM2d3h3c3k0ZHY4eHh2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/777Aby0ZetYE8/giphy.gif"; 
                return;
            }
        
            let items = $scope.lunchItems.split(',')
                .map(item => item.trim()) // Trim spaces
                .filter(item => item.length > 0); // Remove empty items
        
            if (items.length === 0) {
                $scope.message = "Please enter data first";
                $scope.messageStyle = { "color": "red" };
                $scope.borderClass = "border-danger"; 
                $scope.gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA3M2ltcmNud2RneW82dzliODQ1anZtMmM2d3h3c3k0ZHY4eHh2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/777Aby0ZetYE8/giphy.gif";
            } else if (items.length <= 3) {
                $scope.message = "Enjoy!";
                $scope.messageStyle = { "color": "green" };
                $scope.borderClass = "border-success"; 
                $scope.gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWdrd3VubDFieHdiMnM0MmcxMW91eGJvazA5MHJiZ3V2YWtybXhkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jKaFXbKyZFja0/giphy.gif"; 
            } else {
                $scope.message = "Too much!";
                $scope.messageStyle = { "color": "green" };
                $scope.borderClass = "border-success";
                $scope.gifUrl = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2RzYzJ0Z2xkOHlkcnA4cGtnM3hkdnU0NjZzeHB5dnYwcmc3Mnd2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12uXi1GXBibALC/giphy.gif"; 
            }
        };
        
    }
})();
