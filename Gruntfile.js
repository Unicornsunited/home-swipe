"use strict";

module.exports = function(grunt) {
    const _port = grunt.option('port'),
        _jsInput = [
            'shared/declarations.js',
            'components/**/*.js',
            'shared/**/*.js'
        ];


    // Project configuration.
    grunt.initConfig({

        // Grunt-sass 
        sass: {
            dev: {
                options: {
                    sourceMap: true,
                    outputStyle: 'nested',
                },
                files: [{
                    src: ['scss/app.scss'],
                    dest: 'dist/app.min.css'
                }]
            },
            build: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed',
                },
                files: [{
                    src: ['scss/app.scss'],
                    dest: 'dist/app.min.css'
                }]
            },
        },

        // Grunt-contrib-watch
        watch: {
            sass: {
                files: ['./**/*.scss'],
                tasks: [
                    'sass:dev'
                ]
            },
            js: {
                files: _jsInput,
                tasks: [
                    'concat:dev',
                    'babel:dev'
                ]
            },
            options: {
                livereload: true,
                spawn: false
            }
        },
        express: {
            options: {
                background: true
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        concat: {
            dev: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/app.min.js': _jsInput,
                }
            },
            build: {
                files: {
                    'dist/app.min.js': _jsInput,
                }
            },
        },
        babel: {
            dev: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/app.min.js': ['dist/app.min.js']
                },
            },
            build: {
                options: {
                    sourceMap: false
                },
                files: {
                    'dist/app.min.js': ['dist/app.min.js']
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                screwIE8: true,
                sourceMap: true,
                sourceMapIn: (path) => `${path}.map`
            },
            dev: {
                files: {
                    'dist/app.min.js': ['dist/app.min.js']
                }
            },
            build: {
                options: {
                    sourceMap: false,
                    drop_console: true
                },
                files: {
                    'dist/app.min.js': ['dist/app.min.js']
                }
            }
        }
    });

    // Project configuration.
    // ... 

    // Loads Grunt Tasks
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    // ...
    grunt.registerTask('build', [
        'sass:build',
        'concat',
        'babel:build'
    ]);
    grunt.registerTask('deploy', [
        'build',
        'express:build'
    ]);
    grunt.registerTask('dev', [
        'express:dev',
        'concat',
        // 'babel:dev',
        'sass:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
