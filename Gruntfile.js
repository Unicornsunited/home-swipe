"use strict";

module.exports = function(grunt) {
    const _port = grunt.option('port'),
        _jsInput = [
            'shared/declarations.js',
            'shared/**/*.js',
            'patterns/**/*.js'
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
                files: ['**/*.scss'],
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
            jade: {
                files: "**/*.jade",
                tasks: [
                    'jade:dev'
                ]
            },
            options: {
                spawn: false
            }
        },
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            build: {
                options: {
                    script: 'server.js',
                    background: false
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
        jade: {
            dev: {
                options: {
                    basedir: ".",
                    data: {
                        debug: true,
                        timestamp: "<%= new Date().getTime() %>"
                    }
                },
                files: [{
                    src: [
                        "**/*.jade",
                        "!**/_*.jade"
                    ],
                    dest: "dist/templates",
                    flatten: true,
                    expand: true,
                    ext: ".html"
                }]
            },
            build: {
                options: {
                    basedir: ".",
                    data: {
                        debug: false
                    }
                },
                files: [{
                    src: [
                        "**/*.jade",
                        "!**/_*.jade"
                    ],
                    dest: "dist",
                    expand: true,
                    ext: ".html"
                }]
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
        'concat:build',
        'babel:build',
        'jade:build'
    ]);
    grunt.registerTask('deploy', [
        'build',
        'express:build'
    ]);
    grunt.registerTask('dev', [
        'express:dev',
        'concat:dev',
        'babel:dev',
        'sass:dev',
        'jade:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
