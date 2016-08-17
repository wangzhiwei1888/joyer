var browserSync = require('browser-sync');
var program = require('commander');
var config = require(program.config || require('../joyer.config')());
var browserSyncConfig = config.tasks.browserSync;
var gulp = require('gulp');
var path = require('path');

gulp.task('browserSync', function() {
  browserSyncConfig.server.baseDir = path.join(process.env.CWD_PATH, browserSyncConfig.server.baseDir);
  // console.log(browserSyncConfig, browserSyncConfig);
  return browserSync(browserSyncConfig);
});;
