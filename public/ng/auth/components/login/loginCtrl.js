angular
	.module('thecaApp')
			
		.controller('loginCtrl', 

			function(

				$scope, 
				$rootScope, 
				$http, 
				$location, 
				userLoggedInFactory) {

	  		// This object will be filled by the form
			  $scope.user = {};
			  $rootScope.loggedInUser = userLoggedInFactory.get();
			  $rootScope.message = '';

			  // Register the login() function
			  $scope.login = function(){
			    $http.post('/login', {
			      username: $scope.user.username,
			      password: $scope.user.password,
			    })
			    .success(function(user){
			      // No error: authentication OK
			      $rootScope.message = 'Authentication successful!';
			      $location.url('/list');

			      // $rootScope.loggedInUser = $scope.user.username;
			      // console.log('loggedInUser: ' + $rootScope.loggedInUser);
			    })
			    .error(function(){
			      // Error: authentication failed
			      $rootScope.message =  'Hibás felhasználónév vagy jelszó: ';
			      $location.url('/#list');
			    });
			  };
			})