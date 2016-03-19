'use strict';

angular.module('bookClubApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });