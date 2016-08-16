var program = require('commander')
var config = require(program.config || require('../joyer.config')())
var gulp = require('gulp');
var repeatString = require('../lib/repeatString');
var sizereport = require('gulp-sizereport');

// 6) Report sizes
gulp.task('size-report', function() {
  var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8) + '*.*';

  return gulp.src([config.root.dest + hashedFiles, '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }));
});
