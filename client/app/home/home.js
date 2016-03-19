'use strict';

angular.module('bookClubApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  });