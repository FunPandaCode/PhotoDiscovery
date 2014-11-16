module.exports = function(grunt) {
  /**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   * Load Configurations
   */
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };
  var userConfig = require( './build.config.js' );
  grunt.util._.extend(config, userConfig, loadConfig('./tasks/options/'));
  grunt.initConfig(config);

  /**
   * Load Tasks
   */
  grunt.loadTasks('tasks');

  /**
   * Build task gets app ready for development and testing
   *  1. Clean build directory
   *  2. Copy application js to build directory
   *  3. Copy third party's frameworks to build directory
   *  4. Build the index.html to include all the files
   */
  grunt.registerTask('build', ['clean:build','copy:build_app', 'copy:build_libs','index:build']);

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `watcher` (that's why the configuration var above is
   * `watcher`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask( 'watch', 'watcher' );
  grunt.registerTask( 'watch', [ 'build', 'watcher' ] );


  /**
   *  Utility function to retrieve all tasks' options
   *
   *  key:
   *      concat
   *  value:
   *      module.exports = {
   *          options: {
   *              separator: ';'
   *          },
   *          dist: {
   *              src: [],
   *              dest: 'dist/<%= pkg.name %>.js'
   *          }
   *      }
   *
   *  final result:
   *      concat: {
   *          options: {
   *              separator: ';'
   *          }
   *          dist: {
   *              src: [],
   *              dest: 'dist/<%= pkg.name %>.js'
   *          }
   *      }
   */
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }
}
