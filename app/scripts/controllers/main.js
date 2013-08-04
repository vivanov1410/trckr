'use strict';

trckrApp
  .controller('MainCtrl', ['$scope', '$window', 'dataService', function ($scope, $window, dataService) {

    // set page title
    $window.document.title = 'Keeps your trip organized | Trckr';

  }]);
