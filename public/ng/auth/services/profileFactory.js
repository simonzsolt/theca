angular
	.module('thecaApp')


// =============================USER FACTORY=============================

		.factory('profileFactory', function($resource) {
				return $resource('/profile/:id', {id: '@_id'}, {
					'update' : {method: 'PUT'}
				})
			})