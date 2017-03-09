angular.module('plumo.controllers')

.controller('TasksCtrl', function ($scope, Room, Task) {
    $scope.house={};
    Task.getUserTasks().then(function(tasks){
        $scope.tasks=tasks.data;
        console.log(tasks);
    })
    Room.getHouse().then(function(house){
        $scope.house=house;
    })

    $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });
});