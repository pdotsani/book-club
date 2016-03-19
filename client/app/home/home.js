'use strict';

angular.module('bookClubApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
      	authenticate: true,
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  });