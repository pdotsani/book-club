'use strict';

angular.module('bookClubApp')
  .controller('MainCtrl', 
    function ($scope, Auth, $location) {

    $scope.isLoggedIn = Auth.isLoggedIn;  
    $scope.user = {};
    $scope.regUser = {};
    $scope.errors = {};
    $scope.open = {
      login: true,
      reg: false
    };

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $location.path('/home');
        })
        .catch(function(err) {
          $scope.user = {};
          $scope.errors = {};
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid && $scope.regUser.password == $scope.regUser.passwordVerify) {
        Auth.createUser({
          name: $scope.regUser.name,
          email: $scope.regUser.email,
          password: $scope.regUser.password
        })
        .then( function() {
          $scope.regUser = {};
          // Account created, redirect to home
          $location.path('/home');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
