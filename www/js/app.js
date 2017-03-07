// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'starter.services'])

    .constant('API_URL', 'http://plumoapi.codeandroses.com/')

    .run(function ($ionicPlatform, $ionicPush) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $ionicPush.register().then(function(t) {
            return $ionicPush.saveToken(t);
        }).then(function(t) {
            console.log('Token saved:', t.token);
        });
    })

    .config(function ($ionicCloudProvider) {
        $ionicCloudProvider.init({
            "core": {
                "app_id": "fb3834c0"
            },
            "push": {
                "sender_id": "520207412152",
                "pluginConfig": {
                    "ios": {
                        "badge": true,
                        "sound": true
                    },
                    "android": {
                        "iconColor": "#343434"
                    }
                }
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.tasks', {
                url: '/tasks',
                views: {
                    'tab-tasks': {
                        templateUrl: 'templates/tab-tasks.html',
                        controller: 'TasksCtrl'
                    }
                }
            })

            .state('tab.rooms', {
                url: '/rooms',
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/tab-rooms.html',
                        controller: 'RoomsCtrl'
                    }
                }
            })

            .state('tab.users', {
                url: '/users',
                views: {
                    'tab-users': {
                        templateUrl: 'templates/tab-users.html',
                        controller: 'UsersCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/tasks');

    });
