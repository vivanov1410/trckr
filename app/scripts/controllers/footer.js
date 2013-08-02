'use strict';

trckrApp
  .controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.currentYear = new Date().getFullYear(); // TODO: add server side year
  }]);