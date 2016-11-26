
angular.module('thecaApp')
    .config(function($translateProvider) {
        $translateProvider.translations('en', {
			HEADLINE: 'Hello there, This is my awesome app!',
			INTRO_TEXT: 'And it has i18n support!',
			BH_NAME: 'Title in the Bibliotheca Hungarica'
			})
		.translations('hu', {
			HEADLINE: 'Ez egy fejléc!',
			INTRO_TEXT: 'Ez egy bevezető!',
			BH_NAME: 'Elnevezés a BH-ban'
		});          
		$translateProvider.preferredLanguage('hu');
    });

