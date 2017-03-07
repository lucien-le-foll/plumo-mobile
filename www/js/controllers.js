angular.module('starter.controllers', [])

    .controller('MainCtrl', function($scope){

    })

    .controller('TasksCtrl', function ($scope) {
        $scope.$on('cloud:push:notification', function(event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });
    })

    .controller('RoomsCtrl', function ($scope) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
    })

    .controller('UsersCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
