module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/app.js': ['src/app.js']
        },
        options: {
          transform: ['babelify']
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: [
          'src/index.html',
          'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: 'dist/'
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 3000,
          base: [
            'dist'
          ]
        }
      }
    },
    clean: ['dist']
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('run', ['clean', 'browserify', 'copy', 'connect']);
};
