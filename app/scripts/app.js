'use strict';

var trckrApp = angular.module('trckrApp', ['appConfig', 'ngResource', 'ui.state', 'ui.date', 'parse'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'parseProvider', 'parseConfig', function ($stateProvider, $urlRouterProvider, $httpProvider, parseProvider, parseConfig) {
    
    //  any unmatched url send to /
    $urlRouterProvider.otherwise("/") ;
    
    // set up the states
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('fuelling', {
        url: '/fuelling',
        templateUrl: 'views/fuelling.html',
        controller: 'FuellingCtrl'
      });

    // initialize Parse
    parseProvider.init(parseConfig);

    // set default http headers for parse service
    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'ZmCmnkbxuyVKQzPhersdfeorJ9dYOvpgr9q3eHXX'; // TODO: extract to separate config file
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'rrJfu9fOq3Gy6WTFvFKfxHCZIUP2hUmLOiemAWoz';
    //$httpProvider.defaults.headers.post['X-I-Am-A-POST-Request'] = true;
    //$httpProvider.defaults.headers.get['X-I-Am-A-GET-Request'] = true;
  }]);
