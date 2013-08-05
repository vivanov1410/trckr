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
        
        // contructor
        function Model(className, attributes) {
          this.className = className;
          this.attributes = attributes;    
        }

        // saves record to database
        Model.prototype.save = function() {
          var _this = this;
          var deferred = $q.defer();

          // convert javascript date to parse date
          // date typeof Date
          this.attributes.date = {
            "__type": "Date",
            "iso": this.attributes.date
          };

          // add default user ACL
          this.attributes.ACL = {};
          this.attributes.ACL[Parse.auth.user.objectId] = {
            read: true,
            write: true 
          };

          $log.log('creating', _this.className);
          Parse._request('POST', '/classes/' + this.className, this.attributes, null).
            success(function(data, status, headers, config) {
              $log.log('created', _this.className, data.objectId);
              _this.objectId = data.objectId;
              deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
              $log.log('failed to create', _this.className, status, data);
              deferred.reject(data);
            });

          return deferred.promise;
        };

        // retrieves all records from database
        Model.prototype.query = function() {
          var _this = this;
          var deferred = $q.defer();

          $log.log('retrieving all', _this.className);
          Parse._request('GET', '/classes/' + this.className, null, null).
            success(function(data, status, headers, config) {
              $log.log('retrieved all', _this.className, data.results.length);

              // convert parse date objects to javascript Date objects
              for( var i = data.results.length - 1; i >= 0; i-- ) {
                data.results[i].date = new Date(Date.parse(data.results[i].date.iso));
              };

              deferred.resolve(data.results);
            }).
            error(function(data, status, headers, config) {
              $log.error('failed to retrieve all', _this.className);
              deferred.reject(data);
            });

          return deferred.promise;
        };

        // create: ->
        //   Parse._request('POST', @constructor, @encodeParse())
        //   .then (response) =>
        //     @objectId = response.data.objectId
        //     @createdAt = response.data.createdAt
        //     if token = response.data.sessionToken
        //       @sessionToken = token
        //     return @

        return Model;
      })();

      return Parse;
    }
  };
});