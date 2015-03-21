module.exports = function(grunt) {
  grunt.initConfig({
    buildDir: 'build',
    concat: {
      everything: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/threejs/build/three.min.js'
        ],
        dest: '<%= buildDir %>/everything.js'
      }
    },
    processhtml: {
      index: {        
        files: {
          '<%= buildDir %>/index.html': ['index.html']
        }
      }
    },
    copy: {
      bootstrap: {
        expand: true,
        flatten: true,
        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        dest: '<%= buildDir %>/'
      }
    },
    clean: ['<%= buildDir %>/']
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.registerTask('default', ['clean', 'concat', 'copy', 'processhtml']);
};
