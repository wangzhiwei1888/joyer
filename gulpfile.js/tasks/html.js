var program = require('commander')
var config = require(program.config || require('../joyer.config')())
if (!config.tasks.html) return

var browserSync = require('browser-sync')
var data = require('gulp-data')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin = require('gulp-htmlmin')
var path = require('path')
var render = require('gulp-nunjucks-render')
var fs = require('fs')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(process.env.CWD_PATH, config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
  dest: path.join(process.env.CWD_PATH, config.root.dest, config.tasks.html.dest),
}

var getData = function(file) {
  var dataPath = path.resolve(process.env.CWD_PATH, config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

gulp.task('html', function() {

  return gulp.src(paths.src)
    .pipe(data(getData))
    .pipe(render({
      path: [path.join(process.env.CWD_PATH, config.root.src, config.tasks.html.src)],
      watch: false,
    }))
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})
