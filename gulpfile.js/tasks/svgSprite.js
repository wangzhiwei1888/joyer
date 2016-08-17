var program = require('commander')
var config = require(program.config || require('../joyer.config')())
if (!config.tasks.svgSprite) return

var browserSync = require('browser-sync')
var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var svgstore = require('gulp-svgstore')
var path = require('path')

gulp.task('svgSprite', function() {

  var settings = {
    src: path.join(process.env.CWD_PATH, config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(process.env.CWD_PATH, config.root.dest, config.tasks.svgSprite.dest)
  }

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})
