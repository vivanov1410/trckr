'use strict';

trckrApp
  .factory('authService', ['parse', 'storageService', function (parse, storageService) {
    
    var logged = false;
    var currentUser = storageService.get('trckr.user');
    if( typeof currentUser !== 'undefined' && currentUser !== null ) {
      logged = true;
    }
  
    return {

      // return a current logged in user
      current: function() {
        return currentUser;
      },

      // check if user is logged in
      logged: function() {
        return logged;
      },
      
      // creates a new user
      signup: function(user) {
        return parse.signup(user).then(
          function(response) {
            // if suceeded then
            // save user info and session token to local storage
            storageService.set('trckr.user', JSON.stringify(user));

            // set current user
            currentUser = user;
            logged = true;
          },
          function(response) {

          });
      },

      // logs in a user
      login: function(user) {

      },

      // logs out a user
      logout: function() {
        // remove record from storage
        storageService.remove('trckr.user');

        // set current user to null
        currentUser = null;
        logged = false;
      }
    };
  }])