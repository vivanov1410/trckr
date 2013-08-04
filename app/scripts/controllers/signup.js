'use strict';

trckrApp
  .controller('SignupCtrl', ['$scope', '$window', '$location', 'authService', function ($scope, $window, $location, authService) {

    // set page title
    $window.document.title = 'Sign Up | Trckr';

    $scope.signup = function(user) {
      // set email same as username
      user.email = user.username;

      authService.signup(user).then(
        function(response) {
          // if succeede then go to dashboard page
          $location.url('dashboard');
        });
    };

  }]);