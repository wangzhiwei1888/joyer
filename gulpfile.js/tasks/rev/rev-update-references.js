var program = require('commander');
var config = require(program.config || require('./../../joyer.config')());
var gulp = require('gulp');
var path = require('path');
var revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function() {
  var manifest = gulp.src(path.join(process.env.CWD_PATH, config.root.dest, 'rev-manifest.json'));

  return gulp.src(path.join(process.env.CWD_PATH, config.root.dest, '/**/**.{css,js}'))
    .pipe(revReplace({
      manifest: manifest
    }))
    .pipe(gulp.dest(path.join(process.env.CWD_PATH, config.root.dest)));
});
