angular
	.module('thecaApp')


// =============================USER FACTORY=============================

		.factory('userLoggedInFactory', function($resource) {
				return $resource('/loggedin');
			})