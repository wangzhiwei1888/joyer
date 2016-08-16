var config = require('./../config');

var gulp = require('gulp');
var zip = require('gulp-zip');
var path = require('path');

var dirname = path.dirname(config.root.dest);
var name = config.root.dest.replace(dirname, '').replace('/', '') + '.zip';

// console.log(dirname);
// console.log(name);
gulp.task('zip', function() {
  return gulp.src(path.join(config.root.dest, '/**/*'))
    .pipe(zip(name))
    .pipe(gulp.dest(config.root.dest));
});
