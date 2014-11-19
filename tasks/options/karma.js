/**
 * The Karma configurations.
 */
module.exports = {
    options: {
        configFile: '<%= build_dir %>/karma-unit.js'
    },
    unit: {
        port: 9019,
        background: true
    },
    continuous: {
        singleRun: true
    }
};
