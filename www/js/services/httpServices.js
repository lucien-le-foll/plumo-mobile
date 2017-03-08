angular.module('plumo.services')

    .factory('HttpClient', function($http, API_URL, Token){
        return {
            get: get,
            post: post,
            put: put,
            remove: remove
        };

        function get(endpoint, options) {
            options = angular.isObject(options) ? options : {};
            options.paramSerializer = '$httpParamSerializerJQLike';

            return getRequest('GET', endpoint, null, options);
        }

        function post(endpoint, params, options) {
            return getRequest('POST', endpoint, params, options);
        }

        function put(endpoint, params, options) {
            return getRequest('PUT', endpoint, params, options);
        }

        function remove(endpoint, params, options) {
            return getRequest('DELETE', endpoint, params, options);
        }

        function getRequest(method, endpoint, data, options) {
            var config = angular.extend({}, options, {
                method: method,
                url: API_URL + endpoint,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (angular.isDefined(data)) {
                config.data = angular.toJson(data);
            }

            if(typeof Token.getToken() === 'string'){
                config.headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ Token.getToken()
                }
            }

            return $http(config);
        }
    });