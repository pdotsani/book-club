'use strict';

angular.module('bookClubApp')
  .controller('HomeCtrl', 
    function () {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    //User Variables
    $scope.books = {};

    //Alert object
    $scope.alerts=[];

    //Book model data
    $scope.bookData = {
      name:'',
      author:'',
      img: ''
    }

    $scope.loadBooks = function () {
      $http.get('/api/books/').success(function(res){
        $scope.books = res;
        console.log("books loaded!");
      }).error(function(err){
        console.log(err);
      });
    }

    //Alert functions
    $scope.bookAddAlert = function() {
      $scope.alerts.push({type: 'success', msg: $scope.bookData.name+' added!'});
      console.log(alerts);
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.addBook = function() {
      $http.post('/api/books/', {
        _id: $scope.bookData.name,
        author: $scope.bookData.author,
        contributor: $scope.getCurrentUser().name,
        image: $scope.bookData.img
      }).success(function(res){
        $scope.alerts.push({type: 'success', msg: $scope.bookData.name+' added!'});
        console.log(res + ' submitted!');
        //Reset scope variable
        $scope.bookData = {
          name:'',
          author:'',
          img: ''
        }
      }).error(function(err) {
        console.log(err);
      });
      $scope.loadBooks();
    };

    //Login load: Get books from db
    $scope.loadBooks();

  });
