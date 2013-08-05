'use strict';

var parseModule = angular.module('parse', []);

parseModule.provider('parse', function() {
  var _config = {};
  
  return {
    init: function(config) {
      _config = config;
    },

    $get: function($http, $q, $log) {
      var Parse = {
        baseUrl: 'https://api.parse.com/1',
        auth: {},
        _request: function(method, path, data, params) {
          var headers = {
            "X-Parse-Application-Id": _config.appId,
            "X-Parse-REST-API-Key": _config.apiKey,
            "Content-Type": "application/json"
          };

          if( typeof Parse.auth.sessionToken !== 'undefined' && Parse.auth.sessionToken !== null ) {
            // add session token to request header if exists
            headers["X-Parse-Session-Token"] = Parse.auth.sessionToken;
          }

          return $http({
            method: method,
            url: Parse.baseUrl + path,
            data: data,
            params: params,
            headers: headers
          });
        },

        // creates new user
        signup: function(user) {
          var deferred = $q.defer();

          $log.log('creating a new user');
          Parse._request('POST', '/users', user, null).
            success(function(data, status, headers, config) {
              $log.log('created a new user:', data.objectId);
              // set password to null for security
              user.objectId = data.objectId;
              user.sessionToken = data.sessionToken;
              user.password = null;

              deferred.resolve(user);
            }).
            error(function(data, status, headers, config) {
              $log.log('failed to create a new user:', data, status);
              deferred.reject(data);
            }); 

          return deferred.promise;
        },

        // signs in user
        login: function(user) {
          var deferred = $q.defer();

          $log.log('logging in as', user.username);
          Parse._request('GET', '/login', null, user).
            success(function(data, status, headers, config) {
              $log.log('logged in as', user.username);
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              $log.log('failed to login', data, status);
              deferred.reject(data);
            }); 

          return deferred.promise;
        }
      };

      // base class all classes should inherit from
      Parse.Model = (function() {
        function Model(className, attributes) {
          this.className = className;
          this.attributes = attributes;    
        }

        return Model;
      })();

      return Parse;
    }
  };
});