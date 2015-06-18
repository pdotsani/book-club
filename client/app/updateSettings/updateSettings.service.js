'use strict';

angular.module('bookClubApp')
  .service('updateSettings', function (Auth, $http) {
    return {
    	city: function(cityName) {
    		$http.put('/api/users/'+Auth.getCurrentUser()._id+'/'+cityName+'/city/').success(
    			function(res){
    		  	console.log(res.city);
    		});
    	},
    	state: function(stateName){
    		$http.put('/api/users/'+Auth.getCurrentUser()._id+'/'+stateName+'/state/').success(
    			function(res){
    		  	console.log(res.state);
    		});
    	},
    	fullname: function(fName) {
    		$http.put('/api/users/'+Auth.getCurrentUser()._id+'/'+fName+'/fname/').success(
    			function(res){
    		  	console.log(res.fullname);
    		});
    	}
    }
  });
