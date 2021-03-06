angular.module('plumo.services')

    .factory('Register', function(HttpClient, Auth){
        return {
            register: function (name, email, password) {
                return  HttpClient.post('/user', {
                    name : name,
                    email : email,
                    password : password
                }).then(function(){
                    return Auth.login(email, password);
                }, function(response){
                    return response;
                });
            }
        }
    })

    .factory('Auth', function (HttpClient, Token) {
        return {
            login: function (email, password) {
                return HttpClient.post('/login', {
                    email: email,
                    password: password
                }).then(function(response){
                    Token.setToken(response.data.token);
                    return true;
                }, function (error) {
                    console.log(error);
                    Token.setToken();
                    return false;
                });
            },
            logout: function () {
                Token.setToken();
            },
            isLoggedIn: function () {
                return Token.getToken();
            }
        }
    })

    .factory('Token', function($window){
        return {
            getToken: function () {
                return $window.localStorage.getItem('token');
            },
            setToken: function (token) {
                if (token) {
                    $window.localStorage.setItem('token', token);
                } else {
                    $window.localStorage.removeItem('token')
                }
            }
        }
    });