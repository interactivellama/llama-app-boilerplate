'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// configurable paths
	var yeomanConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			coffee: {
				files: ['<%= yeoman.app %>/public/js/{,*/}*.coffee'],
				tasks: ['coffee']
			},
			less: {
				files: ['<%= yeoman.app %>/css/{,*/}*.less'],
				tasks: ['less']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/*.html',
					'{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						'.tmp',
						'test/browser',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				force: true
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/js/{,*/}*.js',
				'!<%= yeoman.app %>/js/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
				}
			}
		},
		coffee: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/js',
					src: '{,*/}*.coffee',
					dest: '<%= yeoman.app %>/js',
					ext: '.js'
				}]
			}
		},
		less: {
			dist: {
				files: {
					'<%= yeoman.app %>/css/main.css': ['<%= yeoman.app %>/css/main.less']
				},
				options: {
					sourceMap: true,
					sourceMapFilename: '<%= yeoman.app %>/css/main.css.map',
					sourceMapBasepath: '<%= yeoman.app %>/',
					sourceMapRootpath: '/'
				}
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		// not enabled since usemin task does concat and uglify
		// check index.html to edit your build targets
		// enable this task if you prefer defining your build targets here
		/*uglify: {
			dist: {}
		},*/
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/js/{,*/}*.js',
						'<%= yeoman.dist %>/css/{,*/}*.css',
						'<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
						'<%= yeoman.dist %>/fonts/{,*/}*.*'
					]
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/css/main.css': [
						'.tmp/css/{,*/}*.css',
						'<%= yeoman.app %>/css/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'fonts/{,*/}*.*',
						'.htaccess',
						'images/{,*/}*.{webp,gif}'
					]
				}]
			},
			server: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/bower_components/font-awesome/fonts/',
					dest: '<%= yeoman.app %>/fonts/font-awesome',
					src: ['*']
				}, {
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts/',
					dest: '<%= yeoman.app %>/fonts/glyphicons',
					src: ['*']
				}]
			}
		},
		concurrent: {
			dist: [
				'coffee',
				'less',
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		}
	});

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'coffee',
			'less',
			'copy:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	grunt.registerTask('test', [
		'clean:server',
		'coffee',
		'less',
		'copy:server',
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'copy:server',
		'useminPrepare',
		'concurrent',
		'cssmin',
		'concat',
		'uglify',
		'copy',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test'
	]);

};