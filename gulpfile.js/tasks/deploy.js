var program = require('commander');
var config = require(program.config || require('../joyer.config')());
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var open = require('open');
var os = require('os');
var pkg = require('../../package.json');
var path = require('path');

var settings = {
  url: pkg.homepage,
  src: path.join(process.env.CWD_PATH, config.root.dest, '/**/*'),
  ghPages: {
    cacheDir: path.join(os.tmpdir(), pkg.name)
  }
};

gulp.task('deploy', ['build:production'], function() {
  return gulp.src(settings.src)
    .pipe(ghPages(settings.ghPages))
    .on('end', function() {
      open(settings.url);
    });
});
