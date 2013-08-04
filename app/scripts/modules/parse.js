'use strict';

var parseModule = angular.module('parse', []);

parseModule.provider('parse', function() {
  var _config = {};
  
  return {
    init: function(config) {
      _config = config;
    },

    $get: function($http) {
      var baseUrl = 'https://api.parse.com/1';
    }
  };
});