angular    
    .module('thecaApp')

// -----------------------------LIST CONTROLLER-----------------------------

        .controller('uploadCtrl', [
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

                $scope.rec = {

                    bh_name: '',
                    origin: '',
                    doc_date_from: '',
                    doc_date_to: '',
                    source_type: '',
                    ownership: '',
                    poss_name: '',
                    poss_name_var: '',
                    poss_origin: '',
                    poss_date: '',
                    poss_place: '',
                    poss_occ: '',
                    poss_nat: '',
                    rec_name: '',
                    rec_prev_place: '',
                    rec_curr_place: '',
                    rec_prev_score: '',
                    rec_pub: '',
                    book_num_from: '',
                    book_num_to: '',
                    book_title_num_from: '',
                    book_title_num_to: '',
                    bh_num: '',
                    rec_lang: '',
                    inherit: '',
                    vol_missing_num: '',
                    bibl: '',
                    note: '',
                    text: '',
                    prog: '',
                    created_at: '', 
                    created_by: $rootScope.loggedInUser.nickname, 
                    last_mod: '',    
                    mod_by: '' 
                };

                $scope.postRec = function postRec(){

                if ($rootScope.loggedInUser.role !== 'user') {                       

                        $scope.post_conf = confirm(
                                'Biztosan fel akarja tölteni a ezt a verset?');

                        if( $scope.post_conf === true ) {

                            thecaFactory.save($scope.rec, function($location){
                                $scope.data = thecaFactory.query();

                                $scope.rec = {

                                    bh_name: '',
                                    origin: '',
                                    doc_date_from: '',
                                    doc_date_to: '',
                                    source_type: '',
                                    ownership: '',
                                    poss_name: '',
                                    poss_name_var: '',
                                    poss_origin: '',
                                    poss_date: '',
                                    poss_place: '',
                                    poss_occ: '',
                                    poss_nat: '',
                                    rec_name: '',
                                    rec_prev_place: '',
                                    rec_curr_place: '',
                                    rec_prev_score: '',
                                    rec_pub: '',
                                    book_num_from: '',
                                    book_num_to: '',
                                    book_title_num_from: '',
                                    book_title_num_to: '',
                                    bh_num: '',
                                    rec_lang: '',
                                    inherit: '',
                                    vol_missing_num: '',
                                    bibl: '',
                                    note: '',
                                    text: '',
                                    prog: '',
                                    created_at: '', 
                                    created_by: '',
                                    last_mod: '',    
                                    mod_by: '' 
                                };
                            }); // thecaFactory
                            
                            $location.path( "/list" );
                            alert('Sikeres feltöltés!');
                        } // if conf

                        else {
                            alert('Mégsem!');
                        } // else

                    } // if loggeding == user

                    else {
                        alert('Nincs jogosultsága a művelethez!');
                    }
                }; // $scope.postRec
          
        }]); // controller