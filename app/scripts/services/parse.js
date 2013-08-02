'use strict';

trckrApp
  .factory('parseService', ['$log', '$q', '$resource', function ($log, $q, $resource) {

    var api = 'https://api.parse.com/1';

    var questionResource = $resource(
      api + '/classes/Question/:id',
      {
        id: '@id'
      });

    return {
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