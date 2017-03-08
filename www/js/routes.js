angular.module('plumo')

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('login', {
                url: '/login',
                data: {
                    authentication: false
                },
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('register', {
                url: '/register',
                data: {
                    authentication: false
                },
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })

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
                        controller: 'RoomsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });