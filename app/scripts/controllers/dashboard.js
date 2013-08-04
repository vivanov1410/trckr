'use strict';

trckrApp.
  controller('DashboardCtrl', ['$scope', '$window', '$location', 'authService', function ($scope, $window, $location, authService) {
    
    // secured page, check if user is logged in
    if( !authService.logged() )
      $location.url('login');

    // set page title
    $window.document.title = 'Dashboard | Trckr';

  }])