requirejs.config({
    baseUrl: 'scripts/',
    paths: {
        jquery: '/bower_components/jquery/jquery',
	    underscore: '/bower_components/underscore/underscore',
	    backbone: '/bower_components/backbone/backbone',
    }
});

require(['require','jquery', 'underscore', 'backbone'], function(require) {
	console.log('Yeah, it\'s an app!');

});