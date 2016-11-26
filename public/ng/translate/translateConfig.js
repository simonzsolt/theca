
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
		hits: 'találat',

		// Detailed view //

		origin: 'Származási hely',
		ownership: 'Intézményi/magán',
		poss_name: 'Tulajdonos neve',
		poss_name_var: 'Tulajdonos névváltozatai',
		poss_origin: 'Tulajdonos származása',
		poss_date: 'Tulajdonoshoz köthető dátum',
		poss_place: 'Tulajdonoshoz köthető hely',
		poss_occ: 'Tulajdonos foglalkozása',
		poss_nat: 'Tulajdonos nemzetisége',
		rec_name: 'Jegyzék leírója',
		rec_prev_place: 'Jegyzék egykori lelőhelye(i)',
		rec_curr_place: 'Jegyzék mai lelőhelye, jelzete',
		rec_prev_score: 'Jegyzék régebbi jelzete',
		rec_pub: 'Jegyzék kiadása(i)',
		book_num_to: 'A könyvek száma',
		book_title_num_to: 'A könyvcímek száma',
		bh_num: 'Számozás a BH-ban',
		inherit: 'Adományozott/öröklött',
		vol_missing_num: 'Hiányzóként megjelölt kötetek száma',
		bibl: 'Bibliográfia',
		prog: 'A forrásfeldolgozás szintje',
		par: 'A jegyzék szövege',
		note: 'Megjegyzés'
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
		hits: 'hits',

		// Detailed view //

		origin: 'Origin',
		ownership: 'Institute/private',
		poss_name: "Owner's name",
		poss_name_var: "Owner's name variants",
		poss_origin: "Owner's origin",
		poss_date: 'Date attributed to owner',
		poss_place: 'Place attributed to owner',
		poss_occ: "Owner's occupation",
		poss_nat: "Owner's nationality",
		rec_name: "Author's name",
		rec_prev_place: 'Previous location',
		rec_curr_place: 'Current location',
		rec_prev_score: 'Previous shelfmark',
		rec_pub: 'Editions',
		book_num_to: 'Number books',
		book_title_num_to: 'Number of titles',
		bh_num: 'Number in the Bibliotheca Hungarica',
		inherit: 'Donated/inherited',
		vol_missing_num: 'Number of missing volumes',
		bibl: 'Bibliography',
		prog: 'Progress',
		par: 'Full text of the record',
		note: 'Notes'
	});          

	$translateProvider.preferredLanguage('hu');
});

 // <span ng-controller="translateCtrl"> {{ '' | translate }} </span>