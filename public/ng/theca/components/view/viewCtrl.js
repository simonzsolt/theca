angular    
    .module('thecaApp')

// -----------------------------LIST CONTROLLER-----------------------------

        .controller('viewCtrl', [
            '$scope', 
            '$routeParams',
            'thecaFactory',
            '$rootScope', 
            '$location', 

            function($scope, $routeParams, thecaFactory, $rootScope, $location){ 
              
                var thecaId = $routeParams.id;

                $scope.rec = thecaFactory.get({ id: thecaId }, function(){

                });
        }]);    