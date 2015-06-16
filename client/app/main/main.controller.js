'use strict';

angular.module('bookClubApp')
  .controller('MainCtrl', 
    function ($scope, $window, $http, Auth, $location) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    //User Variables
    $scope.user = {};
    $scope.errors = {};

    //Get books from db
    $scope.books;
    $http.get('/api/books/').success(function(res){
      $scope.books = res;
      console.log($scope.books);
    }).error(function(err){
      console.log(err);
    });

    //Book model data from forum
    $scope.bookName;
    $scope.bookAuthor;
    $scope.bookName;
    $scope.bookDesc;


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

    $scope.addBook = function() {
      $http.post('/api/books/', {
        _id: $scope.bookName,
        author: $scope.bookAuthor,
        desc: $scope.bookDesc,
        contributor: '',
        image: $scope.bookImg
      }).success(function(res){
        console.log(res + ' submitted!');
      }).error(function(err) {
        console.log(err);
      });
    };

  });
