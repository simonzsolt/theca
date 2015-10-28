angular
    .module('thecaApp')


// =============================POEM FACTORY=============================


        // service for listing, uploading and editing

        .factory('searchFactory', function($resource){

            // var instead of return

            return $resource('/search/:q', {q: 'q'}, {

            }) //return $resource
        }); // searchFactory