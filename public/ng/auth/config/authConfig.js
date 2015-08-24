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


// -----------------------------ROUTES CONFIG FOR AUTHENTICATION-----------------------------


             $routeProvider

                .when('/signup', {
                    templateUrl: 'ng/auth/components/signup/signupView.html',
                    controller: 'signupCtrl'
                })

                .when('/login', {
                    templateUrl: 'ng/auth/components/login/loginView.html',
                    controller: 'loginCtrl'
                })

                .when('/unauth', {
                    templateUrl: 'ng/auth/components/unauth/unauthView.html',
                    controller: 'unauthCtrl'
                    // css: 'assets/css/unauth.css'
                })

                .when('/profile/id/:userId', {
                    templateUrl: 'ng/auth/components/profile/profileView.html',
                    controller: 'profileCtrl',
                    resolve: { 
                        loggedin: checkLoggedin 
                    } 
                })

                .when('/users', {
                    templateUrl: 'ng/auth/components/users/usersView.html',
                    controller: 'usersCtrl',
                    resolve: { 
                        loggedin: checkLoggedin 
                    } 
                })

                .when('/admin/id/:userId', {
                    templateUrl: 'ng/auth/components/users/editUsersView.html',
                    controller: 'editUsersCtrl',
                    resolve: { 
                        loggedin: checkLoggedin 
                    } 
                });

                
        }); // config