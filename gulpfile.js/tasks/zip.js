var program = require('commander');
var config = require(program.config || require('./../joyer.config')());

var gulp = require('gulp');
var zip = require('gulp-zip');
var tap = require('gulp-tap');
var path = require('path');

var dirname = path.dirname(config.root.dest);
var name = config.root.dest.replace(dirname, '').replace('/', '') + '.zip';

// console.log(dirname);
// console.log(name);
gulp.task('zip', function() {
  return gulp.src(path.join(process.env.CWD_PATH, config.root.dest, '/**/*'))
    .pipe(tap(function(file) {
      if (file.isDirectory()) {
        file.stat.mode = parseInt('40777', 8);
      }
    }))
    .pipe(zip(name))
    .pipe(gulp.dest(path.join(process.env.CWD_PATH, config.root.dest)));
});