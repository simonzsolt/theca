
angular.module('thecaApp').config(function($translateProvider) {

    $translateProvider.translations('hu', {

    	// List view //

		bh_name: 'Elnevezés a BH-ban',
		poss_name: 'Tulajdonos neve',
		rec_lang: 'Jegyzék nyelve',
		rec_name: 'Jegyzék leírója',
		source_type: 'Forrástípus',
		remove: 'Eltávolítás',
		edit: 'Szerkesztés',
		
		// Navbar //

		editor: 'Szerkesztő',
		list: 'Lista',
		search: 'Kereső',
		detailed: 'Részletek',
		upload: 'Feltöltés',
		register: 'Regisztráció',
		login: 'Bejelentkezés',
		logout: 'Kijelentkezés',
		
		// Search page //

		free_text: 'Szövegben',
		gte_date: 'Nem korábban mint',
		lte_date: 'Nem később mint',
		search_btn: 'Keresés',
		hits: 'találat'

		// Detailed view //

		origin: 'Származási hely',
		ownership: 'Intézményi/magán',
		// poss_name: '',
		// poss_name_var: '',
		// poss_origin: '',
		


	})

    .translations('en', {

    	// List view //

		bh_name: 'Title in the Bibliotheca Hungarica',
		poss_name: 'Name of the owner',
		rec_lang: "Record's language",
		rec_name: 'Name of the author',
		source_type: 'Source type',
		remove: 'Remove',
		edit: 'Edit',
		
		// Navbar //

		editor: 'Editor',
		list: 'List',
		search: 'Search',
		detailed: 'Detailed view',
		upload: 'Upload',
		register: 'Register',
		login: 'Login',
		logout: 'Logout',
		
		// Search page //

		free_text: 'Text',
		gte_date: 'Not before',
		lte_date: 'Not after',
		search_btn: 'Search',
		hits: 'hits'

		// Detailed view //

		origin: 'Origin',
		ownership: 'Institute/private',
		// poss_name: '',
		// poss_name_var: '',
		// poss_origin: '',
		


	});          

	$translateProvider.preferredLanguage('hu');
});

 // <span ng-controller="translateCtrl"> {{ '' | translate }} </span>