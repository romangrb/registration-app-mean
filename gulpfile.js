
const gulp = require('gulp');
const spawn = require('child_process').spawn;
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
var node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {

  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gutil.log('Error detected, waiting for changes...');
    }
  });
});

// Static server

gulp.task('frontEndReload', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    
    browserSync.watch(
                   [
                      './app.js', 
                      './app/**/*.js', 
                      './config/*.*', 
                      './model/*.*',
                      './index.html',
                    ],
                    {},
                    browserSync.reload
    )//.on('change', browserSync.reload);
                     
});

gulp.task('backEndReload', function() {
    gulp.watch(
            [
              './app.js', 
              './app/**/*.js', 
              './config/*.*', 
              './model/*.*',
              './index.html',
            ],
            {},
            gulp.series(gulp.parallel('server', 'backEndReload', 'frontEndReload'))
    )
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

/**
 * $ gulp
 * description: start the development environment
 */
 
gulp.task('default', gulp.series(gulp.parallel('server', 'backEndReload', 'frontEndReload')))//, 'frontEndReload'));

