angular.module('plumo.controllers')

    .controller('LoginCtrl', function ($scope, Auth, $state, $ionicHistory, $ionicPush, HttpClient) {
        $ionicHistory.nextViewOptions({disableBack: true});
        $scope.login = function (form) {
            Auth.login(form.email, form.password).then(function(){
                $ionicPush.register().then(function(t) {
                    return HttpClient.put('/user', {
                        app_id: t.token
                    }).then(function(){
                        return $ionicPush.saveToken(t);
                    });
                });
                $state.go('tab.tasks');
            }, function(err){
                $state.go('login');
            })
        }
    })

    .controller('RegisterCtrl', function ($scope, $ionicHistory, Register, $state) {
        $ionicHistory.nextViewOptions({disableBack: true});
        $scope.register = function(form){
            Register.register(
                form.name,
                form.email,
                form.password
            ).then(function(){
                $state.go('tab.rooms')
            }, function(){
                $state.go('login')
            });
        }
    });