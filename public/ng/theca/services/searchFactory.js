angular.module('thecaApp')

// =============================POEM FACTORY=============================

    .factory('searchFactory', function($resource){
    	return $resource('/search/q=:q/gte=:gte/lte=:lte', {q: 'q', gte: 'gte', lte: 'lte'}, {} ) 
    	//return $resource	 
    }); // searchFactory