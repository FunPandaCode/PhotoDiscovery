/**
 * The directories to delete when `grunt clean` is executed.
 */
module.exports = {
  build: [ 
    '<%= build_dir %>'
  ],
  
  release: [
    '<%= compile_dir %>'
  ]
}