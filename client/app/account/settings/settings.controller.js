'use strict';

angular.module('bookClubApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.profile = {};

    $scope.updateProfile = function(form) {
      $scope.submitted = true;
      
      var obj = {};
      obj.id = Auth.getCurrentUser()._id;
      // Run user service... only submit if value exists
      obj.city = $scope.profile.city 
        ? $scope.profile.city : undefined;
      obj.state = $scope.profile.state 
        ? $scope.profile.state : undefined;
      obj.fullName = $scope.profile.fullName 
        ? $scope.profile.fullName : undefined;

      User.update({}, obj, function() {
        $scope.profile = {};
        $scope.message = 'Profile Updated!';
      }, function(err) {
        console.warn(err);
      });
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword(
          $scope.profile.oldPassword, 
          $scope.profile.newPassword)
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
