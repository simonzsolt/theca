angular
    .module('thecaApp')

// =============================CONFIG=============================

// -----------------------------LOGGEDIN CONFIG-----------------------------

        .config(function($routeProvider, $locationProvider, $httpProvider) {


            var checkLoggedin = function($q, $timeout, $http, $location){
                // Initialize a new promise
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('/loggedin').success(function(user){
                    // Authenticated
                    if (user !== '0') {
                        deferred.resolve();
                    }

                    // Not Authenticated
                    else {
                        deferred.reject();
                        $location.url('/unauth');
                    }
                });

                return deferred.promise;
            };
            
            //================================================
            // Add an interceptor for AJAX errors
            //================================================
            $httpProvider.interceptors.push(function($q, $location) {
                return {
                    response: function(response) {
                        // do something on success
                        return response;
                    },

                    responseError: function(response) {
                        if (response.status === 401)
                            $location.url('/unauth');
                            return $q.reject(response);
                    }
                };
            });


// -----------------------------ROUTES CONFIG FOR POEMS-----------------------------

            $routeProvider

                .when('/list', {
                    templateUrl: 'ng/theca/components/list/listView.html',
                    controller: 'listCtrl',
                })
                
                .when('/upload', {
                    templateUrl: 'ng/theca/components/upload/uploadView.html',
                    controller: 'uploadCtrl',
                });
                
        }); // config