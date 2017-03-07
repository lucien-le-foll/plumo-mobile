angular.module('starter.services', [])

    .factory('Auth', function ($http, $q, $window, API_URL) {
        return {
            login: function (email, password) {
                return $http.post(API_URL + '/login', {
                    email: email,
                    password: password
                }).then(function (response) {
                    this.setToken(response.data.token);
                    return response.data;
                }, function (error) {
                    this.setToken();
                    return false;
                });
            },
            logout: function () {
                this.setToken();
            },
            isLoggedIn: function () {
                return this.getToken();
            },
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
    })

    .factory('AuthInterceptor', function ($q, $location, Auth) {
        return {
            request: function (config) {
                var token = Auth.getToken();
                if(token){
                    config.headers['Authorization'] = 'Bearer '+token;
                }

                return config;
            },
            responseError: function(response){
                Auth.setToken();
                $location.path('/');
                return $q.reject(response);
            }
        }
    });
