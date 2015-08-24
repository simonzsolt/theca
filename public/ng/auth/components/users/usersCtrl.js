angular
	.module('thecaApp')

		.controller('usersCtrl', function($scope, userFactory, $routeParams) {

			$scope.predicate = '-created_at';

			$scope.data = userFactory.query();



			// deleting items by _id
	            $scope.deleteAccount = function(user_id){

	                $scope.del_conf = confirm('Biztosan törölni szeretné a felhasználót?');

	                if ($scope.del_conf === true) {
	                    userFactory.delete({id: user_id}, function(){
	                        alert('A felhasználó törölve!');
	                    });

	                    $scope.data = userFactory.query();

	                }; // if scope del_conf
	            }; //$scope.deleteVers
		})