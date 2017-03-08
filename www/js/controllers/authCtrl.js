angular.module('plumo.controllers')

    .controller('LoginCtrl', function ($scope, Auth, $state, $ionicHistory) {
        $ionicHistory.nextViewOptions({disableBack: true});
        $scope.login = function (form) {
            Auth.login(form.email, form.password).then(function(){
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