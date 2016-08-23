var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');
var program = require('commander');
var config = require(program.config || require('../joyer.config')());

gulp.task('build:production', function(cb) {
  var tasks = getEnabledTasks('production');
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, config.tasks.production.rev ? 'rev' : false, 'size-report', cb);
});
