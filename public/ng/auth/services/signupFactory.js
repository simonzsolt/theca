angular
	.module('thecaApp')


// =============================USER FACTORY=============================

		.factory('signupFactory', function($resource) {
				return $resource('/auth/:id', {id: '@_id'}, {
					'update' : {method: 'PUT'}
				})
			})