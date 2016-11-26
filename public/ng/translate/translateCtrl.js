angular.module('thecaApp')
    .controller('translateCtrl', [
        '$scope', 
        '$log',
        '$translate',

        function($scope, $log, $translate){ 

        	$scope.currentLanguage = 'hu';

            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);	 

                $scope.currentLanguage = langKey;

                $log.info('langKey: ' + langKey);
            };

    }]);    