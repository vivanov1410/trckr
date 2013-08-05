'use strict';

trckrApp
  .controller('FuellingCtrl', ['$scope', '$window', '$location', 'dataService', 'authService', function ($scope, $window, $location, dataService, authService) {

    // secured page, check if user is logged in
    if( !authService.logged() ) {
      $location.url('login');
      return;
    }

    // set page title
    $window.document.title = 'Fuelling | Trckr';

    // clear form's elements
    var initForm = function() {
      // init fuelling object
      $scope.fuelling = {};

      // select default country
      $scope.countries = dataService.getCountries();
      $scope.fuelling.country = $scope.countries[0];

      // select default state
      $scope.updateValues($scope.fuelling.country);

      // set default date for today
      $scope.fuelling.date = new Date();

      // load all fuellings
      $scope.fuellings = dataService.getAllFuellings();
    };
    
    // updates states and volume types based on country
    $scope.updateValues = function(country) {
      $scope.states = dataService.getStates(country);
      $scope.fuelling.state = $scope.states[0];

      $scope.fuelling.volumeType = dataService.getVolumeType(country);
    }

    // saves fuelling to database
    $scope.submitFuelling = function(fuelling, form) {
      if( form.$valid ) {
        // if form is valid then save to database
        dataService.addFuelling(fuelling).then(
          function(response) {
            initForm();
          });
      }
    }

    // return full state name
    $scope.fullStateName = function(state) {
      return state.abbreviation + ' - ' + state.name;
    }

    initForm();

  }]);