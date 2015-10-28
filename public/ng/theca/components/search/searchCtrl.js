angular.module('thecaApp')

        .controller('searchCtrl', [
            '$scope', 
            '$routeParams', 
            'searchFactory',
            '$location', 
            '$log',
            '$sce',
            
            function($scope, $routeParams, searchFactory, $location, $log, $sce){

            	$scope.search = '';
            	$scope.freeSearch = '';
            	$scope.results = '';
            	$scope.result = '';

            	$scope.search = function search() {
            		var q = $scope.freeSearch;
            		// $log.info(q);
            		$scope.results = searchFactory.get( { q : q }, function(){
            			// $log.info($scope.results.hits.hits[0].highlight);
            			angular.forEach($scope.results.hits.hits, function(v, i) {
            				// $log.info(v.highlight);
            				var highObj = v.highlight;
            				var propNames = Object.getOwnPropertyNames(highObj);
            				var highArr = [];

            				// $log.info(propNames)

            				angular.forEach(propNames, function(val, idx) {
            					$log.info( highObj[val] )

            					angular.forEach(highObj[val], function(value, index){
            						highArr.push(value);
            						// $scope.deliberatelyTrustDangerousSnippet = function() {
               			// 			return $sce.trustAsHtml(value);
            					})

            				})
            				$scope.highArr = highArr;
            			})
            		} );

            	};	

        }]);