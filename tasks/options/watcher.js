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
        tasks: [ 'jshint:gruntfile' ],
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
        tasks: [ 'jshint:src', 'karma:unit:run', 'copy:build_app' ]
    },

    /**
     * When a JavaScript unit test file changes, we only want to lint it and
     * run the unit tests. We don't want to do any live reloading.
     */
    jsunit: {
        files: [
            '<%= app_files.jsunit %>'
        ],
        tasks: [ 'jshint:test', 'karma:unit:run' ],
        options: {
            livereload: false
        }
    },

    /**
    * When sass files change, recompile it
    */
    sass: {
        files: [ 'src/**/*.scss' ],
        tasks: [ 'sass:build' ]
    }
};
