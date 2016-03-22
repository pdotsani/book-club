'use strict';

angular.module('bookClubApp')
  .controller('HomeCtrl', 
    function ($scope, Auth, Book) {

    $scope.getCurrentUser = Auth.getCurrentUser;
    //User Variables
    $scope.books = [];

    //Alert object
    $scope.alerts=[];
    $scope.alertActive = false;

    //Book model data
    $scope.bookData = {};

    function resetForm() {
        $scope.bookData = {};
    }

    $scope.loadBooks = function () {
        Book.get(function(res){
            if(res.length > 0) {
                $scope.books = res;
                console.log('books loaded!');
                $scope.alerts
                    .push({
                        type: 'success', 
                        msg: $scope.bookData.name+' added!'
                    });
            }
        }, function(){
            $scope.alerts
                .push({
                    type: 'error', 
                    msg: 'oops! something bad happened...'
                });
        });
    };

    $scope.toggleAlert = function() {
        $scope.alertActive = !$scope.alertActive;
    };

    $scope.addBook = function(form) {

        if(form.$valid) {
            Book.add({},{
              name: $scope.bookData.name,
              author: $scope.bookData.author,
              contributor: Auth.getCurrentUser()._id,
              image: $scope.bookData.img
            }, function(){
              $scope.alerts.push({
                    type: 'success', 
                    msg: $scope.bookData.name+' added!'
                });
              resetForm();
            }, function() {
              $scope.alerts.push({
                    type: 'error', 
                    msg: 'oops! something bad happened...'
                });
            });
            $scope.loadBooks();
        } else {
            // raise error...
        }
    };

    $scope.removeBook = function(bookId) {
        Book.remove({},{id: bookId}, 
            function() {
                $scope.alerts
                    .push({
                        type: 'error', 
                        msg: 'book has been deleted'
                    });
                $scope.loadBooks();
        }, function() {
                $scope.alerts
                    .push({
                        type: 'error', 
                        msg: 'oops something bad happened...'
                    });
        });
    };

    $scope.loadBooks();
  });
