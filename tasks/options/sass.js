/**
 * The `copy` task just copies files from A to B.
 */
module.exports = {
    options: {
        outputStyle: 'nested'
    },

    build: {
        files: {
            '<%= build_dir %>/src/css/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.sass %>'
        }
    },

    compile: {
        files: {
            '<%= build_dir %>/src/css/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.sass %>'
        }
    }
};
