angular
	.module('thecaApp')

// -----------------------------SIGNUP CONTROLLER-----------------------------

		.controller('signupCtrl', [

			'$scope', 
			'signupFactory',
			'$rootScope',
			'$location',

			function($scope, signupFactory, $rootScope, $location) {

			$rootScope.message = '';

			$scope.user = {
				username: '',
				password: '',
				role: 'user',
				nickname: '',
				first_name: '',
				last_name: ''
			}; 

			$scope.signup = function() {

				$rootScope.signupErr = '';

				signupFactory.save($scope.user, function(err, $location) {
					$scope.accounts = signupFactory.query();
					$rootScope.signupErr = err.message;

					if ($rootScope.signupErr) {
						alert($rootScope.signupErr);
					}
					else {
		            	alert('Regisztráció elküldve!');
		            }

		            $rootScope.signupErr = '';

					$scope.user = {
						username: '',
						password: '',
						role: '',
						nickname: '',
						first_name: '',
						last_name: ''
					}; 
				});
			};

		}]) //signupCtrl
