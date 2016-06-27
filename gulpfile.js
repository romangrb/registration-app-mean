/*var gulp = require('gulp'),
    server = require('gulp-express');

gulp.task('server', function () {
    return server.run({
        file: 'app.js'
    });
});

gulp.task('default', ['server']);
*/

var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

/**
 * $ gulp
 * description: start the development environment
 */
 
gulp.task('default', function() {
  gulp.run('server')

  gulp.watch([
      './app.js', 
      './app/**/*.js', 
      './config/*.*', 
      './model/*.*',
      './index.html',
      ], function() {
    gulp.run('server')
  })
  
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})