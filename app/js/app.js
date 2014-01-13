requirejs.config({
    baseUrl: 'public/js/',
    paths: {
        app: '../app'
    }
});

require(["main"], function(util) {

	if(window.matchMedia) {	
		require(["vendor/RespondMore-master/media.match.min"], function(util) {
			Main.testMediaQueries();
		});
	}

});


/* Project: 
   Author: Stephen M James
*/

/* jshint devel:true */
/* global Modernizr */

// Modified http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
// Only fires on body class (working off strictly <body> classes)

var Main = {
	vars: {
	},
	// Run on all pages
	common: {
		init: function() {
			"use strict";

			Main.initElementBinding();
			Main.initFOUC();
		},
		finalize: function() {

		}
	},

	home: {
		init: function() {
			enquire.register("screen and (min-width: 600px)", {
				match: function() {
					Main.home.initCarousel(true);
				},
				unmatch: function() {
					Main.home.initCarousel(false);
				}
			}, false);
		}
	},

	/**
	 * [initFOUC prevents Flash of unstyled content by fading it in, see http://www.bluerobot.com/web/css/fouc.asp]
	 * @return {[type]} [description]
	 */
	initFOUC: function() {
		"use strict";

		$('.fouc').animate({
			opacity: 1
		}, 1000);
	},
	/**
	 * [testMediaQueries adds media support with polyfill if needed]
	 * @return {[type]} [description]
	 */
	testMediaQueries: function() {
		// Test need for CSS media query polyfill
		if(!Modernizr.mq('only all')) {	
			require(["vendor/RespondMore-master/js/respond.min", "vendor/enquire.js-master/dist/enquire.js"], function(util) {

			});			
		}

	}
};

/**
 * [UTIL binds each JS function's init to a body class, basically "if($body.hasClass('home'))""]
 * @type {Object}
 */
var UTIL = {
	fire: function(func, funcname, args) {
		var namespace = Main;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
			namespace[func][funcname](args);
		}
	},
	loadEvents: function() {

		UTIL.fire('common');

		$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
			UTIL.fire(classnm);
		});

		UTIL.fire('common', 'finalize');
	}
};


// START HERE and test need for matchMedia polyfill
// 

