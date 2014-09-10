'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'public',
      vendor: '<%= bowerrc.directory %>',
      node: 'node_modules'
    },
    banner: '/*!\n' +
    ' * <%= pkg.name %>-<%= pkg.version %>\n' +
    ' * <%= pkg.author %>\n' +
    ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    ' */\n\n',
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= yeoman.app %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['newer:sass:dev', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      },
      ify: {
        files: '.tmp/scripts/main.js',
        tasks: ['browserify:dev, '],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
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
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '',
          livereload: false
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
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    sass: {
      dev: {
        options: {
          //style: 'expanded',
          //lineNumbers:true,
          loadPath: ['<%= bowerrc.directory %>/foundation/scss/', '<%= bowerrc.directory %>/bourbon/dist/']
        },
        files: {
          '.tmp/styles/app.css': '<%= yeoman.app %>/scss/app.scss',
          '.tmp/styles/flipclock.css': '<%= yeoman.app %>/scss/flipclock.scss'
        }
      },
      dist: {
        options: {
          loadPath: ['<%= bowerrc.directory %>/foundation/scss/', '<%= bowerrc.directory %>/bourbon/dist/']
        },
        files: {
          '<%= yeoman.dist %>/styles/app.css': '<%= yeoman.app %>/scss/app.scss',
          '<%= yeoman.dist %>/styles/flipclock.css': '<%= yeoman.app %>/scss/flipclock.scss'
        }
      }
    },
    browserify: {
      bower: {
        src: ['<%= yeoman.app %>/scripts/bower.js'],
        dest: '.tmp/scripts/vendor.js',
        options: {
          transform: ['debowerify']
        }
      },
      vendor: {
        src: [],
        dest: '.tmp/scripts/vendor.js',
        options: {
          debug: true,
          require: ['jquery']
          //shim: {
          //  FlipClock: {
          //    path: '<%= bowerrc.directory %>/FlipClock/compiled/flipclock.js',
          //    exports: 'FlipClock',
          //    depends: {
          //      'jQuery': 'jquery'
          //    }
          //  }
          //}
        }
      },
      dev: {
        src: ['<%= yeoman.app %>/scripts/main.js'],
        dest: '.tmp/scripts/main.js'
      },
      distVendor: {
        src: ['<%= yeoman.app %>/scripts/bower.js'],
        dest: '<%= yeoman.dist %>/scripts/vendor.js',
        options: {
          transform: ['debowerify']
        }
      },
      dist: {
        src: ['<%= yeoman.app %>/scripts/main.js'],
        dest: '<%= yeoman.dist %>/scripts/main.js',
        options: {
          transform: ['debowerify']
        }
      }
    },
    watchify: {
      options: {
        debug: false,
        ignoreMissing: false,
        standalone: 'mybundle'
      },
      example: {
        src: './<%= yeoman.app %>/scripts/main.js',
        dest: '.tmp/scripts/main.js'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        src: ['.tmp/scripts/vendor.js', '.tmp/scripts/main.js'],
        dest: '.tmp/scripts/app.js'
      },
      dist: {
        src: ['.tmp/scripts/vendor.js', '.tmp/scripts/main.js'],
        dest: '<%= yeoman.dist %>/scripts/app.js'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
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
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    modernizr: {
      dist: {
        // [REQUIRED] Path to the build you're using for development.
        'devFile': '<%= yeoman.vendor %>/modernizr/modernizr.js',

        // [REQUIRED] Path to save out the built file.
        'outputFile': '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',

        // Based on default settings on http://modernizr.com/download/
        //'extra' : {
        //  'shiv' : true,
        //  'printshiv' : false,
        //  'load' : true,
        //  'mq' : false,
        //  'cssclasses' : true
        //},

        // Based on default settings on http://modernizr.com/download/
        //'extensibility' : {
        //  'addtest' : false,
        //  'prefixed' : false,
        //  'teststyles' : false,
        //  'testprops' : false,
        //  'testallprops' : false,
        //  'hasevents' : false,
        //  'prefixes' : false,
        //  'domprefixes' : false
        //},r

        // By default, source is uglified before saving
        'uglify': true,

        // Define any tests you want to implicitly include.
        'tests': [],

        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        'parseFiles': true,

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a 'files' array below.
        // 'files' : {
        // 'src': []
        // },

        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        'matchCommunityTests': false,

        // Have custom Modernizr tests? Add paths to their location here.
        'customTests': []
      }
    },
    concurrent: {
      server: [
        'sass:dev',
        'browserify:bower',
        'browserify:dev',
        'copy:styles'
      ],
      test: [
        'copy:styles',
        'jshint',
        'browserify:vendor',
        'browserify:dev',
        'browserify:test'
      ],
      dist: [
        'sass:dist',
        'browserify:distVendor',
        'browserify:dist',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    scsslint: {
      allFiles: [
        '<%= yeoman.app %>/scss/*.scss'
      ],
      options: {
        //bundleExec: true,
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'concat:dev',
      'autoprefixer',
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
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'mocha',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat:dist',
    'autoprefixer',
    'modernizr',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('dev', [
    //'watchify',
    'clean:server',
    'concurrent:server',
    'concat:dev',
    'autoprefixer',
    'connect:livereload',
    'watch:ify'
  ]);
};
