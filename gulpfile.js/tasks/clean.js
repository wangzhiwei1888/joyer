var gulp = require('gulp');
var del = require('del');
var program = require('commander');
var config = require(program.config || require('../joyer.config')());
var path = require('path');

gulp.task('clean', function (cb) {
  var files = [path.join(process.env.CWD_PATH, config.root.dest)];

  if (config.tasks.css && config.tasks.css.sasscache === false) {
    files.push(path.join(process.cwd(), '.sass-cache'));
  }

  // if (process.env.NODE_COMMAND === 'build') {
  files.push(path.join(process.env.CWD_PATH, config.root.src, '.styles'));
  // }

  // console.log('files', files);

  del(files, {
    force: true
  }).then(function () {
    cb();
  });
});