'use strict';

trckrApp
  .factory('authService', ['parse', 'storageService', function (parse, storageService) {
    
    var updateDataStore = function() {
      // set session token for parse module
      if( typeof currentUser !== 'undefined' && currentUser !== null ) {
        parse.auth.user = currentUser;
        parse.auth.sessionToken = currentUser.sessionToken;
      }
    };

    var logged = false;
    var currentUser = storageService.get('trckr.user');
    if( typeof currentUser !== 'undefined' && currentUser !== null ) {
      logged = true;

      updateDataStore();
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
            updateDataStore();
          },
          function(response) {

          });
      },

      // logs in a user
      login: function(user) {
        return parse.login(user).then(
          function(response) {
            // if succeeded then
            // save user info and session token to local storage
            storageService.set('trckr.user', JSON.stringify(response));

            // set current user
            currentUser = response;
            logged = true;
            updateDataStore();
          },
          function(response) {

          });
      },

      // logs out a user
      logout: function() {
        // remove record from storage
        storageService.remove('trckr.user');

        // set current user to null
        currentUser = null;
        logged = false;
        updateDataStore();
      }
    };
  }])