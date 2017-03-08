angular.module('plumo')

    .constant('API_URL', 'http://plumoapi.codeandroses.com/api')

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

    .run(function ($ionicPlatform, $rootScope, Auth, $location) {

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

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            // if the route doesn't need authentication
            if (angular.isObject(toState.data) && toState.data.authentication === false) {
                return;
            }

            // if we are authenticated
            if (typeof Auth.isLoggedIn() === 'string') {
                return;
            } else {
                $location.path('/login');
                Auth.logout();
            }

            return $location.path('/login');

            // if none of the above, redirect to the login page
        });
    });