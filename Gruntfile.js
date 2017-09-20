module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/**\n' +
                ' * <%= pkg.name %> <%= pkg.version %>\n' +
                ' **/',

        // Unit tests.
        jshint: {
            all: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc',
            }
        },

        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:8001/tests/']
                }
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%= banner %>\n\n',
                mangle: true,
                compress: {
                    drop_console: true
            }
            },
            deploy: {
                files: {
                    // destination: source
                    'dist/jquery.story.share.min.js': 'src/jquery.story.share.js'
                }
            }
        },

        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },

        connect: {
            options: {

            },
            test: {
                options: {
                  port: 8001,
                  base: '.',
                  hostname: 'localhost'
                }
            },
            open: {
                options: {
                    open: 'http://localhost:8000/tests/',
                    directory: 'tests',
                    keepalive: true
                }
            }
        },

    });

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'default',
        [
            'jshint',
            'connect:test',
            'qunit',
            'uglify'
        ]
    );

};
