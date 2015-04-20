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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};
