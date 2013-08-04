'use strict';

trckrApp.
  factory('storageService', ['$window', function ($window) {
    
    // feature detect of localStorage
    var storage = $window.localStorage,
        fail,
        uid;
    try {
      uid = new Date;
      storage.setItem(uid, uid);
      fail = storage.getItem(uid) != uid;
      storage.removeItem(uid);
      fail && (storage = false);
    } catch(e) {
      $log.error('localStorage is not supported');
    }
  
    return {
      
      set: function(key, value) {
        storage.setItem(key, value);
      },

      get: function(key) {
        return JSON.parse(storage.getItem(key));
      },

      remove: function(key) {
        storage.removeItem(key);
      }
    };
  }])