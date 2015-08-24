angular    
    .module('thecaApp')


// -----------------------------LIST CONTROLLER-----------------------------


        .controller('listCtrl', [
            '$scope', 
            '$routeParams', 
            'tehcaFactory',
            '$location', 
            
            function($scope, $routeParams, tehcaFactory, $location){

                $scope.data = tehcaFactory.query();
                $scope.recId = $routeParams.recId;
                $scope.list_menu = true; // for the "List" menu "ng-hide" attr
                
                $scope.predicate = '';

                // deleting items by _id
                $scope.deleteRec = function(rec_id){

                    $scope.del_conf = confirm(
                        'Biztosan törölni szeretné ezt a jegyzéket?');

                    if ($scope.del_conf === true) {
                        tehcaFactory.delete({id: rec_id}, function(){
                            alert('A jegyzék törölve!');
                        });

                        $scope.data = tehcaFactory.query();

                    }; // if scope del_conf
                }; //$scope.deleteRec
        }]); // controller