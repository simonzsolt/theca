angular.module('thecaApp')
    .controller('translateCtrl', [
        '$scope', 
        '$rootScope',
        '$log',
        '$translate',

        function($scope, $rootScope, $log, $translate){ 
        	 
            $rootScope.currentLanguage = $translate.use();	

            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);	 
                $rootScope.currentLanguage = langKey;
                // $log.info('langKey: ' + langKey);
            };

    }]);    