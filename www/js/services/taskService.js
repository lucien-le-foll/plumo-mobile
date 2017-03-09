angular.module('plumo.services')

.factory('Task', function(HttpClient){
	return {
		performTask: function (task) {
			return HttpClient.get('/task/perform/' + task.id);
		},
		saveTask : function(task){  
			return HttpClient.post('/task',task);  
		},
		getUserTasks: function () {
			return HttpClient.get('/task');
		},
		deleteTask: function (task) {
			return HttpClient.remove('/task/'+task.id);
		}
	};
});