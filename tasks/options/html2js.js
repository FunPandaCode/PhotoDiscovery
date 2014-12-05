/**
 * HTML2JS is a Grunt plugin that takes all of your template files and
 * places them into JavaScript files as strings that are added to
 * AngularJS's template cache. This means that the templates too become
 * part of the initial payload as one JavaScript file. Neat!
 */
module.exports = {
    /**
     * These are the templates from `src/app`.
     */
    app: {
        options: {
            base: 'src/app',
            module: 'appTemplates',
            useStrict: true
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/src/app/app.templates.js'
    },

    /**
     * These are the templates from `src/common`.
     */
    common: {
        options: {
            base: 'src/common',
            module: 'commonTemplates',
            useStrict: true
        },
        src: [ '<%= app_files.ctpl %>' ],
        dest: '<%= build_dir %>/src/common/common.templates.js'
    }
};
