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
    livereload: false
  },

  /**
   * When index.html changes, we need to compile it.
   */
  html: {
    files: [ '<%= app_files.html %>' ],
    tasks: [ 'index:build' ]
  },
}