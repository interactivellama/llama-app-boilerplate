requirejs.config({
    baseUrl: 'scripts/',
    paths: {
        jquery: '/bower_components/jquery/jquery',
        'jquery-ui': '/bower_components/jquery-ui/ui/jquery-ui',
	    underscore: '/bower_components/underscore/underscore',
	    backbone: '/bower_components/backbone/backbone',
    }
});

require(['require','jquery', 'jquery-ui', 'underscore', 'backbone', 'app'], function(require) {
	console.log('Yeah, it\'s an app!');

});