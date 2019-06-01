var settings = require("./settings");

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    grunticon: {
      myIcons: {
        files: [
          {
            expand: true,
            cwd: settings.themeLocation + "assets/icons/",
            src: ["*.svg"],
            dest: settings.themeLocation + "public/icons_css/"
          }
        ],
        options: {
          enhanceSVG: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-grunticon");
  /** invoke icon creation with: grunt make-icons */
  grunt.registerTask("make-icons", ["grunticon:myIcons"]);
};
