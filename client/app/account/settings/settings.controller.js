'use strict';

angular.module('bookClubApp')
  .controller('SettingsCtrl', function ($http, $scope, $route, User, Auth, updateSettings) {
    $scope.errors = {};

    $scope.changeSettings = function(form) {
      console.log($scope.user.fullName + ":" + $scope.user.city + ":" + $scope.user.state);
      
      if($scope.user.city != undefined) updateSettings.city($scope.user.city);
      if($scope.user.state != undefined) updateSettings.state($scope.user.state);
      if($scope.user.fullName != undefined) updateSettings.fullname($scope.user.fullName);

      // Clear fields
      $scope.user.fullName = '';
      $scope.user.city = '';
      $scope.user.state = '';

      $route.reload();
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
