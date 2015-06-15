'use strict';

angular.module('bookClubApp')
  .controller('MainCtrl', function ($scope, $window, $http, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.user = {};
    $scope.errors = {};

    $scope.books = [
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita rem commodi voluptatem ut facilis enim reiciendis labore ratione voluptas fuga dolores voluptates error.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque debitis, sequi enim, vel magnam possimus et fugit asperiores neque dolores, ipsa.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, voluptates. Placeat obcaecati quam vel dolor fugiat blanditiis! Porro labore nostrum eum unde? Numquam solut.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eius distinctio nisi quae. Amet, repudiandae adipisci mollitia voluptates delectus aliquid, nesciunt perspiciatis optio accusantiu.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ipsam adipisci velit, laudantium quis! Doloribus molestias animi sed totam modi ipsum explicabo.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores provident, accusamus possimus error! Quia nam, itaque velit ex voluptatem, tenetur sequ.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae, itaque at numquam laboriosam labore amet repellat vel consequatur dicta harum qu.'},
      {name: 'bookname', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero non obcaecati, mollitia voluptas accusamus, odit dicta ex id nisi error necessitatibu..'}
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
  });
