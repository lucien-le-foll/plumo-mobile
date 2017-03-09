angular.module('plumo.controllers')

.controller('RoomsCtrl', function ($scope, Room, $ionicModal, Task) {

    $scope.house={};
    $scope.newTask = null;
    $scope.newRoom = null;

    Room.getHouse().then(function(house){
        $scope.house=house;
    })

    $ionicModal.fromTemplateUrl('ajout-tache.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(taskModal) {
        $scope.taskModal = taskModal;
    });

    $ionicModal.fromTemplateUrl('ajout-piece.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(roomModal) {
        $scope.roomModal = roomModal;
    });

    $scope.openModal = function(modal, room) {
        $scope.selectedRoom = room;
        if(modal == 'room'){
            $scope.roomModal.show();
        } else if (modal == 'task') {
            $scope.taskModal.show();
        }
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.saveTask = function (task, room) {
        console.log(task);
        console.log(room);
        task.room_id=room.id;
        Task.saveTask(task).then(function (response) {
            task.date = new Date();
            $scope.newTask = null;
            room.task.push(response.data);
        });
    };

    $scope.saveRoom = function (room) {
        RoomsService.saveRoom(room).then(function (response) {
            $scope.newRoom = null;
            $scope.house.rooms.push(response.data);
        });
    };

});

