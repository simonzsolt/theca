angular.module('thecaApp')

        .controller('searchCtrl', [
            '$scope', 
            '$routeParams', 
            'searchFactory',
            '$location', 
            '$log',
            
            function($scope, $routeParams, searchFactory, $location, $log){

            	$scope.search = '';
            	$scope.freeTtext = '';
            	$scope.results = '';
            	$scope.result = '';
                $scope.dateFrom = '';
                $scope.dateTo = '';

                $scope.months = [
                    "Január",       
                    "Február",      
                    "Március",      
                    "Április",      
                    "Május",        
                    "Június",       
                    "Július",       
                    "Augusztus",        
                    "Szeptember",       
                    "Október",      
                    "November",     
                    "December"
                ];

                $scope.dateOptions = {
                    autoSize: true,
                    changeYear: true,
                    changeMonth: true,
                    yearRange: '1100:-0',
                    dateFormat: 'yy-MM-dd',
                    dayNamesMin: [ "V","H", "K", "Sze", "Cs", "P", "Sz" ],
                    monthNamesShort: [ "Jan", "Feb", "Már", "Ápr", "Máj", "Jun", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec" ],
                    firstDay: 1
                };

                $scope.dateFrom = '1000-01-01'
                $scope.dateTo ='1600-01-01'
            
            	$scope.search = function search() {
            		var q = $scope.freeText;
                    var gte = $scope.dateFrom;
                    var lte = $scope.dateTo;
                    $log.info(q);

            		// $log.info('gte: ' + gte);

            		$scope.results = searchFactory.query( 
                        { q : q, gte : gte, lte: lte }, function(){

                        $log.info($scope.results)

            		});

            	};	

        }]);