module.exports = function (grunt) {
  let timestamp = Date.now();

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      resources: 'app',
      dist: 'build',
      config: 'app/js/config',
    },

    // transpile code to support all browsers
    "babel": {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          "<%= paths.dist %>/js/app.min.js": "<%= paths.dist %>/js/main.js"
        }
      }
    },

    envpreprocess: {
      dev: {
        files: {
          src: '<%= paths.config %>/env.json'
        },
        options: {
          replacePath: ['<%= paths.dist %>/**/*.*'],
          environment: 'dev'
        }
      },

      prod: {
        files: {
          src: '<%= paths.config %>/env.json'
        },
        options: {
          replacePath: ['<%= paths.dist %>/**/*.*'],
          environment: 'prod'
        }
      },
    },

    // define source files and their destinations
    uglify: {
      prod: {
        options: {
          banner: `/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd-${
              timestamp
              }") %> */\n`,
          report: 'min',
          mangle: false,
        },
        files: {
          '<%= paths.dist %>/js/app.min.js': [
            '<%= paths.dist %>/js/app.min.js'
          ]
        },
      },

      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
        },
        files: {
          '<%= paths.dist %>/js/app.min.js': [
            '<%= paths.dist %>/js/app.min.js'
          ]
        },
      },
    },

    copy: {
      html: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['index.html'],
          dest: 'build/',
          flatten: true,
          filter: 'isFile'
        }]
      },

      core: {
        files: [{
          expand: true,
          cwd: '<%= paths.resources %>',
          src: ['js/*.js'],
          dest: '<%= paths.dist %>'
        }]
      },

      assets: {
        files: [{
          expand: true,
          cwd: '<%= paths.resources %>',
          src: ['style/*.css', ],
          dest: '<%= paths.dist %>'
        }]
      },
    },

    //clean the build dir
    clean: ['<%= paths.dist %>/']
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-envpreprocess');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('build', function (target) {

    if (target === 'dev') {
      env = 'envpreprocess:dev';
    } else if (target === 'prod') {
      env = 'envpreprocess:prod';
    }

    grunt.task.run([
      'clean',
      'copy',
      env,
      'babel',
      'uglify:dev',
    ]);
  });
};
