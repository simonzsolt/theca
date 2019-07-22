angular.module('thecaApp')

    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            .otherwise({
                redirectTo: '/list'
            });
            
    }); // config