/**
 * The `index` task compiles the `index.html` file as a Grunt template. CSS
 * and JS files co-exist here but they get split apart later.
 */
module.exports = {
    /**
   * By default, we want the Live Reload to work for all tasks; this is
   * overridden in some tasks (like this file) where browser resources are
   * unaffected. It runs by default on port 35729, which your browser
   * plugin should auto-detect.
   */
    options: {
        livereload: true
    },

    /**
   * When the Gruntfile changes, it will automatically be reloaded!
   */
    gruntfile: {
        files: [ 'Gruntfile.js', 'build.config.js', 'tasks/*.js', 'task/**/*.js' ],
        options: {
            livereload: false,
            reload: true
        }
    },

    /**
   * When index.html changes, we need to compile it.
   */
    html: {
        files: [ '<%= app_files.html %>' ],
        tasks: [ 'index:build' ]
    },

    /**
   * When our JavaScript source files change, we want to run lint them and
   * run our unit tests.
   */
    jssrc: {
        files: [
            '<%= app_files.js %>'
        ],
        tasks: [ 'karma:unit:run', 'copy:build_app' ]
    }
};
