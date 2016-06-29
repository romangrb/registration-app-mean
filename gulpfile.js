
  const gulp = require('gulp');
  const spawn = require('child_process').spawn;
  const exec = require('child_process').exec;
  const gutil = require('gulp-util');
  const codePs = {
    closeErr : 8,
    closeErrMsg : 'Error detected, waiting for changes...',
    modgoErrMsg : 'Error Mongod :',
    startMondodCommand : 'mongod',
    stopMondodCommand  : 'mongod --shutdown'
  };
  var files = {
        server: ['./app.js'],
        js:   [
              './app/**/*.js', 
              './server/*.js',
              './model/*.js'
              ],
        json: ['./config/*.json'], 
        html: [
              './index.html', 
              './templates/*.*'
              ]
  },
  node = null;
  
  /**
   * $ gulp server
   * description: launch the server. If there's a server already running, kill it.
   */
  
  function runCommand(command) {
    return function (cb) {
      exec(command, function (err, stdout, stderr) {
        gutil.log(stdout, stderr);
        cb(err);
      });
    };
  }
  
  // Mongod tasks
  gulp.task('start-mongo', runCommand(codePs.startMondodCommand));
  gulp.task('stop-mongo',  runCommand(codePs.stopMondodCommand));
  
  // Nodejs start
  gulp.task('server', function() {
  
    if (node) node.kill();
    node = spawn('node', files.server, {stdio: 'inherit'});
    node.on('close', function (code) {
      if (code === codePs.closeErr) {
        gutil.log(codePs.closeErrMsg);
      }
    });
  });
  
  gulp.task('reloadServer', function() {
      gulp.watch([
                  files.server,
                  files.js,
                  files.json,
                  files.html
                ],
                {},
                gulp.parallel('server', 'reloadServer')
      );
  });
  
  // clean up if an error goes unhandled.
  process.on('exit', function() {
      if (node) node.kill();
  });
  
  /**
   * $ gulp
   * description: start the development environment
   */
   
  gulp.task('default', gulp.parallel('start-mongo', 'server', 'reloadServer'));

