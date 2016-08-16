var program = require('commander')
var config = require(program.config || require('./../joyer.config')())

if (!config.tasks.css) return;

var process = require('process');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var compass = require('gulp-compass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
};

var compassConfig = {
  // config_file: './config.rb',
  // environment: 'development'
  // sourcemap: true
  sass: path.join(config.root.src, config.tasks.css.src),
  image: path.join(config.root.src, 'images'),
  css: path.join(config.root.src, '.styles'),
  require: ['compass/import-once/activate'],
};


if (process.env.NODE_ENV === 'production') {
  compassConfig.environment = 'production';
} else {
  compassConfig.comments = true;
}

gulp.task('css', function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(compass(compassConfig))
    .on('error', handleErrors)
    // .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
