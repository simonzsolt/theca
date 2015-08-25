angular    
    .module('thecaApp')

// -----------------------------LIST CONTROLLER-----------------------------

        .controller('uploadFormCtrl', [
            '$scope',
            'thecaFactory',
            '$sce',
            '$rootScope', function($scope, thecaFactory, $sce, $rootScope){


                var data = thecaFactory.query(function(){
                    var Arr = [];
                    angular.forEach(data ,function(value, index){
                        if(value.source_type !== '' && 
                            Arr.indexOf(value.source_type) == -1){
                            Arr.push(value.source_type);
                        }
                        $scope.selectSourceType = Arr;
                    });

                    var Arr = [];
                    angular.forEach(data ,function(value, index){
                        if(value.rec_lang !== '' && 
                            Arr.indexOf(value.rec_lang) == -1){
                            Arr.push(value.rec_lang);
                        }
                        $scope.selectRecLang = Arr;
                    });

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