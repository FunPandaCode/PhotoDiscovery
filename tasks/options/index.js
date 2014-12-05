/**
 * The `index` task compiles the `index.html` file as a Grunt template. CSS
 * and JS files co-exist here but they get split apart later.
 */
module.exports = {
    /**
   * During development, we don't want to have wait for compilation,
   * concatenation, minification, etc. So to avoid these steps, we simply
   * add all script files directly to the `<head>` of `index.html`. The
   * `src` property contains the list of included files.
   */
    build: {
        dir: '<%= build_dir %>',
        src: [
            '<%= libs_files.js %>',
            '<%= libs_files.css %>',
            '<%= build_dir %>/src/app/*.js',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>',
            '<%= build_dir %>/src/common/**/*.js',
            '<%= build_dir %>/src/**/*.module.js',
            '<%= build_dir %>/src/**/*.service.js',
            '<%= build_dir %>/src/**/*.controller.js',
            '<%= build_dir %>/src/**/*.directive.js',
            '<%= build_dir %>/src/css/<%= pkg.name %>-<%= pkg.version %>.css'
        ]
    },

    /**
   * When it is time to have a completely compiled application, we can
   * alter the above to include only a single JavaScript and a single CSS
   * file. Now we're back!
   */
    compile: {
        dir: '<%= compile_dir %>',
        src: [
            '<%= concat.compile_js.dest %>',
            '<%= vendor_files.css %>',
            '<%= build_dir %>/src/css/<%= pkg.name %>-<%= pkg.version %>.css'
        ]
    }
};
