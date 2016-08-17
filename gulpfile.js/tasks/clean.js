var gulp = require('gulp');
var del = require('del');
var program = require('commander');
var config = require(program.config || require('../joyer.config')());
var path = require('path');

gulp.task('clean', function(cb) {
  var files = [path.join(process.env.CWD_PATH, config.root.dest, '/**/*')];
  // var files = [path.join(config.root.dest, 'rev-manifest.json')];

  // for (var key in config.tasks) {
  //   var task = config.tasks[key];
  //   if (task.dest) {
  //     var glob = '**/*' + (task.extensions ? ('.{' + task.extensions.join(',') + ',map}') : '');
  //     files.push(path.join(config.root.dest, task.dest, glob));
  //   }
  // }

  // Don't touch node_modules or source files!
  files.push('!node_modules/**/*');
  files.push('!' + path.join(process.env.CWD_PATH, config.root.src, '/**/*'));

  // console.log('files', files);
  del(files).then(function(paths) {
    // console.log(paths);
    cb();
  });
});
