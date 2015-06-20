'use strict';

angular.module('bookClubApp')
  .controller('MainCtrl', 
    function ($scope, $window, $http, Auth, $location, $route) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    //User Variables
    $scope.userLogin = {};
    $scope.user = {};
    $scope.errors = {};

    //Get books from db
    $scope.books;
    $http.get('/api/books/').success(function(res){
      $scope.books = res;
      console.log("books loaded!");
    }).error(function(err){
      console.log(err);
    });

    //Book model data
    $scope.bookData = {
      name:'',
      author:'',
      img: ''
    }


    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.userLogin.email,
          password: $scope.userLogin.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
      $scope.userLogin = {};
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
      $scope.user = {};
    };

    $scope.addBook = function() {
      $http.post('/api/books/', {
        _id: $scope.bookData.name,
        author: $scope.bookData.author,
        contributor: $scope.getCurrentUser().name,
        image: $scope.bookData.img
      }).success(function(res){
        console.log(res + ' submitted!');
      }).error(function(err) {
        console.log(err);
      });
      $route.reload();
    };

  });
