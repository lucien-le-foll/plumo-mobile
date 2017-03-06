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
    })

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
