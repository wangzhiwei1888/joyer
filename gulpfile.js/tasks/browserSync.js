var browserSync = require('browser-sync')
var program = require('commander')
var config = require(program.config || require('../joyer.config')())
var gulp = require('gulp')

gulp.task('browserSync', function() {
  return browserSync(config.tasks.browserSync)
})
