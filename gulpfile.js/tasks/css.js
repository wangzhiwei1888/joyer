var program = require('commander')
var config = require(program.config || require('./../joyer.config')())

if (!config.tasks.css) return;

var process = require('process');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var compass = require('gulp-compass');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../lib/handleErrors');
var path = require('path');
var cssnano = require('gulp-cssnano');

var paths = {
  src: path.join(process.env.CWD_PATH, config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(process.env.CWD_PATH, config.root.dest, config.tasks.css.dest)
};

// console.log('sass', paths.src)
if (config.compass !== false) {
  var compassConfig = {
    // config_file: './config.rb',
    // environment: 'development'
    // sourcemap: true
    sass: path.join(process.env.CWD_PATH, config.root.src, config.tasks.css.src),
    image: path.join(process.env.CWD_PATH, config.root.src, 'images'),
    css: path.join(process.env.CWD_PATH, config.root.src, '.styles'),
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
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({
        stream: true
      }));
  });
} else {
  gulp.task('css', function() {
    var processors = [
      assets({
        cachebuster: true,
        relative: true
      })
    ];

    return gulp.src(paths.src)
      .pipe(gulpif(!global.production, sourcemaps.init()))
      .pipe(sass(config.tasks.css.sass))
      .on('error', handleErrors)
      .pipe(postcss(processors))
      .pipe(autoprefixer(config.tasks.css.autoprefixer))
      .pipe(gulpif(global.production, cssnano({
        autoprefixer: false
      })))
      .pipe(gulpif(!global.production, sourcemaps.write()))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({
        stream: true
      }));
  })
}
