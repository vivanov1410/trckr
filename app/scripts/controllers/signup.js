'use strict';

trckrApp
  .controller('SignupCtrl', ['$scope', '$window', 'userService', function ($scope, $window, userService) {

    // set page title
    $window.document.title = 'Sign Up | Trckr';

    $scope.signup = function(user) {
      userService.signup(user).then(
        function(response) {

        },
        function(response) {

        });
    };
    
  }]);