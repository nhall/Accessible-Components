/*global module:false*/
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! \n' +
				' * <%= pkg.name %> v<%= pkg.version %> [<%= grunt.template.today("yyyy-mm-dd") %>] \n' +
				' * <%= pkg.description %> \n' +
				' * <%= pkg.author %> \n' +
				' */ \n\n'
		},

		// Watcher
		watch: {
			options: {
				livereload: true
			},
			html: {
				files: 'components/jade/**/**.jade',
				tasks: 'jade'
			},
			config: {
				files: [
					'Gruntfile.js',
					'package.json'
				],
				options: {
					reload: true
				}
			}
		},

		// Remove any previously-created files
		clean: {
			html: 'components/html/**.html',
			reports: 'reports',
			listing: 'components/index.html'
		},

		// Jade templates
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					cwd: "components/jade",
					src: [
						"**/*.jade",
						"!_**/*.jade"
					],
					dest: "components/html",
					expand: true,
					ext: ".html"
				}]
			}
		},

		// Accessibility and validation testing
		accessibility: {
			options: {
				accessibilityLevel: 'WCAG2AA',
				reportType: 'txt',
				reportLocation : 'reports',
				verbose: false,
				reportLevels: {
					notice: false,
					warning: false,
					error: true
				}
			},
			target: {
				src: ['components/html/**/*.html']
			}
		},

		// Create directory listing
		includeSource: {
			options: {
				basePath: 'components/html',
				baseUrl: '',
				templates: {
					html: {
						link: '<li><a href="html/{filePath}">{filePath}</a></li>'
					}
				}
			},
			target: {
				files: {
					'components/index.html': 'components/index.template.html'
				}
			}
		},

		// Browsersync auto refresh
		browserSync: {
			target: {
				bsFiles: {
					src : [
						'components/jade/'
					]
				},
				options: {
					server: {
						baseDir: "./"
					},
					watchTask: true,
					open: false
				}
			}
		}
	});

	// Default task
	grunt.registerTask('default', 'build');

	// Build
	grunt.registerTask('build', ['clean', 'jade', 'includeSource', 'accessibility' ]);

	// Develop
	grunt.registerTask('devel', ['browserSync', 'watch']);

};
