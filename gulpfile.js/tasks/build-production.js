var program = require('commander')
var config = program.config || require('./../../util/joyer.config')()
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

gulp.task('build:production', function(cb) {
  var tasks = getEnabledTasks('production');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', 'size-report', cb);
});
