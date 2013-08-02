'use strict';

trckrApp
  .controller('FuellingCtrl', ['$scope', 'dataService', function ($scope, dataService) {

    $scope.fuelling = {};
    
    // updates states and volume types based on country
    $scope.updateValues = function(country) {
      $scope.states = dataService.getStates(country);
      $scope.fuelling.state = $scope.states[0];

      $scope.fuelling.volumeType = dataService.getVolumeType(country);
    }

    // saves fuelling to database
    $scope.submitFuelling = function(fuelling, form) {
      if( form.$valid ) {
        // if form is valid
        console.log(fuelling);
      }
    }

    // return full state name
    $scope.fullStateName = function(state) {
      return state.abbreviation + ' - ' + state.name;
    }

    // select default country
    $scope.countries = dataService.getCountries();
    $scope.fuelling.country = $scope.countries[0];

    // select default state
    $scope.updateValues($scope.fuelling.country);

  }]);