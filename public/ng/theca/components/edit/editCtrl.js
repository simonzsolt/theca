angular
    .module('thecaApp')

        .controller('editCtrl', [
            '$scope', 
            '$routeParams',
            'thecaFactory',
            '$rootScope', 
            '$location',  

            function($scope, $routeParams, thecaFactory, $rootScope, $location){

                if (!$rootScope.loggedInUser) {
                    console.log('no user');
                    $location.path('/list');
                }

                var recId = $routeParams.id; 

                $scope.rec = thecaFactory.get({id: recId}, function(){

                    $scope.editRec = function editRec() {

                        $scope.rec.mod_by = $rootScope.loggedInUser.nickname;

                        if($rootScope.loggedInUser.role !== 'user') {

                            $scope.edit_conf = confirm(
                                'Biztosan módosítani akarja a jegyzéket?');

                            if($scope.edit_conf === true) {

                            thecaFactory.update($scope.rec, function($location){

                            }); // thecaFactory.update

                            // for list to reload this needs to be here
                            $scope.data = thecaFactory.query();

                            $location.path( "/list" );
                            alert('Sikeres feltöltés!');

                            };   
                        }

                    };

                });

            }]); // edit controller