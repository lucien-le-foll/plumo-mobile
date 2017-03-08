angular.module('plumo.controllers')

    .controller('TasksCtrl', function ($scope) {
        $scope.$on('cloud:push:notification', function (event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });
    });