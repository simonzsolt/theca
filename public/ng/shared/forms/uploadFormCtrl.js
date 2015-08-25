angular    
    .module('thecaApp')

// -----------------------------LIST CONTROLLER-----------------------------

        .controller('uploadFormCtrl', [
            '$scope',
            'thecaFactory',
            '$rootScope', function($scope, thecaFactory, $rootScope){

                $scope.data = thecaFactory.query(function(){
                    var Arr = [];
                    angular.forEach($scope.data ,function(value, index){
                        if(value.source_type !== '' && 
                            Arr.indexOf(value.source_type) == -1){
                            Arr.push(value.source_type);
                        }
                    $scope.selectSourceType = [];
                    });
                    angular.forEach(Arr ,function(value, index){
                        $scope.selectSourceType.push({source: value});
                    });
                    var Arr = [];
                });

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
                    yearRange: '0:-0',
                    dateFormat: 'yy-mm-dd',
                    dayNamesMin: [ 
                        "V",
                        "H", 
                        "K", 
                        "Sze", 
                        "Cs", 
                        "P", 
                        "Sz" 
                    ],
                    monthNamesShort: [ 
                        "Jan", 
                        "Feb", 
                        "Már", 
                        "Ápr", 
                        "Máj", 
                        "Jun", 
                        "Júl", 
                        "Aug", 
                        "Szep", 
                        "Okt", 
                        "Nov", 
                        "Dec" 
                    ],
                    firstDay: 1
                };
            }]);