angular    
    .module('thecaApp')

// -----------------------------LIST CONTROLLER-----------------------------

        .controller('viewCtrl', [
            '$scope', 
            '$routeParams',
            'thecaFactory',
            '$rootScope', 
            '$log',
            '$location',
            '$sce',

            function($scope, $routeParams, thecaFactory, $rootScope, $log, $location, $sce){ 
              
                var thecaId = $routeParams.id;
                $scope.textArray = [];
                $scope.noteArray = [];

                $scope.rec = thecaFactory.get({ id: thecaId }, function(){
                    $scope.textArray = $scope.rec.text.split(/\n/);
                    $scope.noteArray = $scope.rec.note.split(/\n/);

                    // $log.info(textArray);
                });

        }]);    