var browserSync = require('browser-sync')
var program = require('commander')
var config = program.config || require('../joyer.config')()
var gulp = require('gulp')
var path = require('path')

gulp.task('browserSync', function() {
  return browserSync(config.tasks.browserSync)
})
