/**
 * The `copy` task just copies files from A to B.
 */
module.exports = {
    build_app: {
        files: [{
            src: [
                '<%= app_files.js %>'
            ],
            dest: '<%= build_dir %>',
            cwd: '.',
            expand: true
        }]
    },

    build_libs: {
        files: [{
            src: [
                '<%= libs_files.css %>',
                '<%= libs_files.js %>'
            ],
            dest: '<%= build_dir %>',
            cwd: '.',
            expand: true
        }]
    },

    /**
   * Copy 'compile' target, just copies all files in 'build_dir'/assets into
   * 'compile_dir'/assets
   */
    compile: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= compile_dir %>/assets',
                cwd: '<%= build_dir %>/assets',
                expand: true
            }
        ]
    }
};
