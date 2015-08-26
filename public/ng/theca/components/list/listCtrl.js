angular    
    .module('thecaApp')

// -----------------------------LIST CONTROLLER-----------------------------


        .controller('listCtrl', [
            '$scope', 
            '$routeParams', 
            'thecaFactory',
            '$location', 
            
            function($scope, $routeParams, thecaFactory, $location){

                $scope.data = thecaFactory.query();
                $scope.recId = $routeParams.recId;
                $scope.list_menu = true; // for the "List" menu "ng-hide" attr
                
                $scope.predicate = '';

                // deleting items by _id
                $scope.delRec = function(rec_id){

                    $scope.del_conf = confirm(
                        'Biztosan törölni szeretné ezt a jegyzéket?');

                    if ($scope.del_conf === true) {
                        thecaFactory.delete({id: rec_id}, function(){
                            alert('A jegyzék törölve!');
                        });

                        $scope.data = thecaFactory.query();

                    }; // if scope del_conf
                }; //$scope.deleteRec
                
        }]); // controller