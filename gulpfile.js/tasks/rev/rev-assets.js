var program = require('commander');
var config = require(program.config || require('./../../joyer.config')());
var gulp = require('gulp');
var path = require('path');
var rev = require('gulp-rev');
var revNapkin = require('gulp-rev-napkin');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.join(process.env.CWD_PATH, config.root.dest, '/**/*+(css|js|json|html)');

  return gulp.src([path.join(process.env.CWD_PATH, config.root.dest, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(path.join(process.env.CWD_PATH, config.root.dest)))
    .pipe(revNapkin({
      verbose: false
    }))
    .pipe(rev.manifest(path.join(process.env.CWD_PATH, config.root.dest, 'rev-manifest.json'), {
      merge: true
    }))
    .pipe(gulp.dest(''));
});
