/**
 * The `copy` task just copies files from A to B. 
 */
module.exports = {
  build: {
    files: [
      { 
        src: [ 
          '<%= frameworks_files.css %>',
          '<%= frameworks_files.js %>'
        ],
        dest: '<%= build_dir %>',
        cwd: '.',
        expand: true
      }
    ]   
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
}