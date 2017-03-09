angular.module('plumo.services')

.factory('Room', function(HttpClient){
    return {
        saveRoom: function (room) {
            return HttpClient.post('/room', room);
        },
        getHouse: function(){
            return HttpClient.get('/house').then(function(response){
                return response.data;
            });
        }
    };
});