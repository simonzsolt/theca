angular
	.module('thecaApp')

// -----------------------------VIEW CONTROLLER-----------------------------

		.controller('editUsersCtrl', [

			'$scope',
			'$routeParams', 
			'userFactory',
			'$location',
		    
		    function($scope, $routeParams, userFactory, $location) {

		        $scope.userId = $routeParams.userId;

		        $scope.user = userFactory.get({id: $routeParams.userId});

		        $scope.users = userFactory.query(); 


		     $scope.editUser = function() {

		    	

		        $scope.edit_conf = confirm('Biztosan módosítani akarja a felhasználót?');

		        if($scope.edit_conf === true) {

		            userFactory.update($scope.user, function($location){           
		            }); // userFactory.update

		        // for list to reload this needs to be here
		        $scope.users = userFactory.query();

		        $location.path( "/users" );
		        alert('Sikeres feltöltés!');

		        };     
		    }; //editVers

		    }]) //viewCtrl
