module.exports = function(grunt) {

  grunt.initConfig({
    "karma": {
      options: {
        configFile: "karma.conf.js"
      },
      "test": {
        singleRun: true
      },
      "watch": {
        singleRun: false
      }
    }
  });

  grunt.loadNpmTasks("grunt-karma");
  grunt.registerTask("test", ["karma:test"]);
  grunt.registerTask("watch", ["karma:watch"]);
};
