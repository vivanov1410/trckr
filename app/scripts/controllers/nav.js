'use strict';

trckrApp
  .controller('NavCtrl', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
    
    // change nav bar if user is logged in
    $scope.logged = authService.logged;
    
    $scope.logout = function() {
      authService.logout();
      $location.url('/');
    }

  }]);