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

	$scope.performTask = function (task) {
		Task.performTask(task).then(function (response) {
			task.done = response.data.done;
		});
	};

	$scope.deleteTask = function (task) {
		Task.deleteTask(task).then(function (response) {
			_.remove($scope.tasks, {'id' : task.id});
		});
	};
});