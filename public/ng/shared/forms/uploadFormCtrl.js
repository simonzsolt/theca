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

                // record publishes array
                $scope.rec.rec_pub = [{ item: '' }];

                // adding to aray
                $scope.addPub = function addPub(){
                    $scope.rec.rec_pub.push({ item: '' });
                };

                // removing from array
                $scope.removePub = function removePub(){
                    var lastItem = $scope.rec.rec_pub.length -1;
                    $scope.rec.rec_pub.splice(lastItem, 1); 
                };

                // bibliography array
                $scope.rec.bibl = [{ item: '' }];

                 // adding to aray
                $scope.addBibl = function addBibl(){
                    $scope.rec.bibl.push({ item: '' });
                };

                // removing from array
                $scope.removeBibl = function removeBibl(){
                    var lastItem = $scope.rec.bibl.length -1;
                    $scope.rec.bibl.splice(lastItem, 1); 
                };


            }]);