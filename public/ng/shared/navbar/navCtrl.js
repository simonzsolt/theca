angular
    .module('thecaApp')

        .controller('navCtrl', function(

            $scope, 
            userLoggedInFactory,
            tehcaFactory, 
            $routeParams, 
            $location, 
            $rootScope, 
            $route){ 

        $scope.path = $location.path();

        var myPath = $location.path();

        $scope.quit = function quit(){
            $location.url('/logout');
        };

        // $scope.pathId = '';

        if (myPath.indexOf('edit') !=-1 ) {
            var pathId = myPath.replace('/edit/id/', '');
            $scope.editPathId = '/edit/id/' + pathId;
        }

        if (myPath.indexOf('view') !=-1 ) {
            var pathId = myPath.replace('/view/id/', '');
            $scope.viewPathId = '/view/id/' + pathId;
        }

        $rootScope.loggedInUser = userLoggedInFactory.get();

});