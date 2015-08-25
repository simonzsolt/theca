angular
    .module('thecaApp')


// =============================POEM FACTORY=============================


        // service for listing, uploading and editing

        .factory('thecaFactory', function($resource){

            // var instead of return

            return $resource('/data/:id', {id: '@_id'}, {
                'update' : {method: 'PUT'}

            }) //return $resource
        }); // thecaFactory