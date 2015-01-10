module.exports = function(grunt) {

  grunt.initConfig({
    "shell": {
      "webdriver": {
        options: {
          stdout: true
        },
        command: require("path").resolve("node_modules/protractor/bin/webdriver-manager") + " update"
      }
    },
    "run": {
      "app": {
        options: {
          wait: false
        },
        args: [
          "--harmony",
          "app.js"
        ]
      }
    },
    "protractor_webdriver": {
      dummyTarget: {}
    },
    "protractor": {
      dummyTarget: {
        options: {
          configFile: "conf.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-protractor-webdriver");
  grunt.loadNpmTasks("grunt-protractor-runner");
  grunt.registerTask("webdriver-update", ["shell:webdriver"])
  grunt.registerTask("default", ["run:app", "protractor_webdriver", "protractor", "stop:app"]);
};
