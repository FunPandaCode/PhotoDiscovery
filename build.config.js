/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
    build_dir: 'build',
    compile_dir: 'bin',

    /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
    app_files: {
        js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
        jsunit: [ 'src/**/*.spec.js' ],

        coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
        coffeeunit: [ 'src/**/*.spec.coffee' ],

        atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        sass: 'src/sass/main.scss'
    },

    /**
   * This is the same as `app_files`, except it contains patterns that
   * reference frameworks code (`frameworks/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. frameworks-related) files are handled
   * appropriately in `frameworks_files.js`.
   *
   * The `frameworks_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `frameworks_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `frameworks_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   *
   * 'frameworks/angular/angular.js',
   * 'frameworks/angular-bootstrap/ui-bootstrap-tpls.min.js',
   * 'frameworks/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
   * 'frameworks/angular-ui-router/release/angular-ui-router.js',
   * 'frameworks/angular-ui-utils/modules/route/route.js'
   */
    libs_files: {
        js: [
            'libs/angular/angular.js',
            'libs/underscore/underscore.js',
            'libs/angular-animate/angular-animate.js',
            'libs/angular-route/angular-route.js',
            'libs/jquery/dist/jquery.js',
            'libs/bootstrap/dist/js/bootstrap.js',
            'libs/bootstrap/js/popover.js',
            'libs/bootstrap/js/tooltip.js'
        ],
        css: [
            'libs/bootstrap/dist/css/bootstrap.css',
            'libs/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
            'libs/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
            'libs/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
            'libs/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
            'libs/fontawesome/css/font-awesome.css',
            'libs/fontawesome/fonts/FontAwesome.otf',
            'libs/fontawesome/fonts/fontawesome-webfont.eot',
            'libs/fontawesome/fonts/fontawesome-webfont.svg',
            'libs/fontawesome/fonts/fontawesome-webfont.ttf',
            'libs/fontawesome/fonts/fontawesome-webfont.woff'
        ],
        assets: [
        ]
    },

    /**
   * This is a collection of files used during testing only.
   *
   * 'frameworks/angular-mocks/angular-mocks.js'
   */
    test_files: {
        js: [
            'libs/angular-mocks/angular-mocks.js'
        ]
    }
};
