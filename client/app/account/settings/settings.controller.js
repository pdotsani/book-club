'use strict';

angular.module('bookClubApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.user = {};

    $scope.updateProfile = function(form) {
      $scope.submitted = true;

      console.log($scope.user.fullName + 
        ':' + $scope.user.city + 
        ':' + $scope.user.state);
      
      var obj = {};
      // Run user service... only submit if value exists
      obj.city = $scope.user.city 
        ? $scope.user.city : delete obj.city;
      obj.state = $scope.user.state 
        ? $scope.user.state : delete obj.state;
      obj.fullName = $scope.user.fullName 
        ? $scope.user.fullName : delete obj.fullName;

      User.update(obj, function() {
        $scope.user = {};
        $scope.password.message = 'Profile Updated!';
      }).catch(function(err) {
        console.warn(err);
      });
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword(
          $scope.user.oldPassword, 
          $scope.user.newPassword)
        .then(function() {
          $scope.password.message = 'Password changed!';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
