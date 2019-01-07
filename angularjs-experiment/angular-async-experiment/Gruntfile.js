module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 3000,
          base: [
            'src',
            'bower_components'
          ]
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: ['src/index.html'],
        dest: 'dist/index.html'
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/_app.js': 'src/app.js'
        }
      }
    },
    uglify: {
      dist: {
        src: [
          'node_modules/grunt-babel/node_modules/babel-core/browser-polyfill.min.js',
          'dist/_app.js'
        ],
        dest: 'dist/app.js'
      }
    },
    clean: {
      dist: ['dist/']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['babel', 'uglify', 'copy', 'connect']);
};
