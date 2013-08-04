'use strict';

trckrApp
  .controller('LoginCtrl', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
    
    $scope.login = function(user) {
      authService.login(user).then(
        function(response) {
          $location.url('dashboard');
        });
    };

  }]);