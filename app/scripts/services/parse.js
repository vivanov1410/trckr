'use strict';

trckrApp
  .factory('parseService', ['$log', '$q', '$resource', function ($log, $q, $resource) {

    var api = 'https://api.parse.com/1';

    var fuellingResource = $resource(
      api + '/classes/Fuelling/:id',
      {
        id: '@id'
      });

    var userResource = $resource(
      api + '/users/:id',
      {
        id: '@id'
      });

    return {

      // creates new user
      signup: function(user) {
        var deferred = $q.defer();

        $log.log('creating a new user');
        userResource.save(user,
          function(response) {
            deferred.resolve(response);
          },
          function(response) {
            $log.log('failed to create a new user:', response);
            deferred.reject(response);
          });

        return deferred.promise;
      },

      // retrieves all fuelings
      getAllFuellings: function() {
        var deferred = $q.defer();

        $log.log('retrieving all fuellings');
        fuellingResource.get({},
          function(response) {
            $log.log('retrieved all fuellings:', response.results.length);
            
            // convert dates to Date objects
            for (var i = response.results.length - 1; i >= 0; i--) {
              response.results[i].date = new Date(Date.parse(response.results[i].date.iso));
            };

            deferred.resolve(response.results);
          },
          function(response) {
            $log.error('failed to retrieve all fuellings', response)
            deferred.reject(response);
          });

        return deferred.promise;
      },

      addFuelling: function(fuelling) {
        var deferred = $q.defer();

        // change date to match Parse.com date format
        fuelling.date = {
          "__type": "Date",
          "iso": fuelling.date
        }

        $log.log('adding fuelling');
        fuellingResource.save(fuelling, 
          function (response) {
            $log.log('added fuelling:', response.objectId);
            deferred.resolve(response);
          },
          function (response) {
            $log.error('failed to add fuelling:', response);
            deferred.reject(response);
          });

        return deferred.promise;
      },

      getRandomQuestion: function() {
        var deferred = $q.defer();

        // get all questions first
        $log.log('retrieving all quesitons');
        questionResource.get({},
          function(questions) {
            // select random question
            $log.log('retrieved all questions');
            var randomIndex = Math.floor( Math.random() * questions.results.length );
            var result = questions.results[randomIndex];
            deferred.resolve(result);
          },
          function(response) {
            $log.error('failed to retrieve all questions', response)
            deferred.reject(response);
          });

        return deferred.promise;
      }
    };
  }]);