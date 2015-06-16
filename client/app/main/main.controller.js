'use strict';

angular.module('bookClubApp')
  .controller('MainCtrl', function ($scope, $window, $http, Auth, $location) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.user = {};
    $scope.errors = {};

    $scope.books = [
      {name: 'bookname1', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita rem commodi voluptatem ut facilis enim reiciendis labore ratione voluptas fuga dolores voluptates error.'},
      {name: 'bookname2', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque debitis, sequi enim, vel magnam possimus et fugit asperiores neque dolores, ipsa.'},
      {name: 'bookname3', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, voluptates. Placeat obcaecati quam vel dolor fugiat blanditiis! Porro labore nostrum eum unde? Numquam solut.'},
      {name: 'bookname4', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eius distinctio nisi quae. Amet, repudiandae adipisci mollitia voluptates delectus aliquid, nesciunt perspiciatis optio accusantiu.'},
      {name: 'bookname5', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ipsam adipisci velit, laudantium quis! Doloribus molestias animi sed totam modi ipsum explicabo.'},
      {name: 'bookname6', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores provident, accusamus possimus error! Quia nam, itaque velit ex voluptatem, tenetur sequ.'},
      {name: 'bookname7', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae, itaque at numquam laboriosam labore amet repellat vel consequatur dicta harum qu.'},
      {name: 'bookname8', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero non obcaecati, mollitia voluptas accusamus, odit dicta ex id nisi error necessitatibu..'}
    ]

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid && $scope.user.password == $scope.user.passwordVerify) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
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
