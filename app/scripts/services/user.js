'use strict';

trckrApp
  .factory('userService', ['parseService', function (parseService) {
    
  
    return {
      
      signup: function(user) {
        parseService.signup(user).then(
          function(response) {
            // save session token to cookies

            // login user
          },
          function(response) {

          });
      }
    };
  }])