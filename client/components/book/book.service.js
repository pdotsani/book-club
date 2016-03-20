'use strict';

angular.module('bookClubApp')
  .factory('Book', function ($resource) {
    return $resource('/api/books/:id/', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        isArray: true
      },

      add: {
        method: 'POST'
      },

      remove: {
        method: 'DELETE'
      }
	  });
  });
