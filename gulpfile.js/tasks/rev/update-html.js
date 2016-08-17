var gulp = require('gulp');
var program = require('commander');
var config = require(program.config || require('./../../joyer.config')());
var revReplace = require('gulp-rev-replace');
var path = require('path');

// 5) Update asset references in HTML
gulp.task('update-html', function() {
  var manifest = gulp.src(path.join(process.env.CWD_PATH, config.root.dest, '/rev-manifest.json'));
  return gulp.src(path.join(process.env.CWD_PATH, config.root.dest, '/**/*.html'))
    .pipe(revReplace({
      manifest: manifest
    }))
    .pipe(gulp.dest(path.join(process.env.CWD_PATH, config.root.dest)));
});
