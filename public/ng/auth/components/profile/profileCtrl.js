angular
	.module('thecaApp')

// -----------------------------VIEW CONTROLLER-----------------------------

		.controller('profileCtrl', [

			'$scope',
			'$routeParams', 
			'profileFactory',
			'$rootScope',
			'$location',
		    
		    function($scope, $routeParams, profileFactory, $rootScope, $location) {

		        $scope.userId = $routeParams.userId;

		        $scope.user = profileFactory.get({id: $routeParams.userId});

		        $scope.users = profileFactory.query(); 


		     $scope.editProfile = function() {

		    	

		        $scope.edit_conf = confirm('Biztosan módosítani akarja a felhasználót?');

		        if($scope.edit_conf === true) {

		            profileFactory.update($scope.user, function($location){           
		            }); // profileFactory.update

		        // for list to reload this needs to be here
		        $scope.users = profileFactory.query();

		        $location.path( "/profile/id/" + $scope.userId );
		        alert('A módosítások siekresen elküldve!');

		        };     
		    }; //editProfile

		}]) //profileCtrl
