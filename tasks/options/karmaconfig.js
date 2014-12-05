/**
 * This task compiles the karma template so that changes to its file array
 * don't have to be managed manually.
 */
module.exports = {
    unit: {
        dir: '<%= build_dir %>',
        src: [
            '<%= libs_files.js %>',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>',
            '<%= test_files.js %>'
        ]
    }
};
