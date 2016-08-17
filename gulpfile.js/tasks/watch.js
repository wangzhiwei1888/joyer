var program = require('commander');
var config = require(program.config || require('../joyer.config')());
var gulp = require('gulp');
var path = require('path');
var watch = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'css'];

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    if (task) {
      var filePattern = path.join(process.env.CWD_PATH, config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
      // console.log(filePattern);
      watch(filePattern, function() {
        gulp.start(taskName);
      });
    }
  });

  var jrmuiSrc = path.join(process.env.CWD_PATH, config.jrmui.src);
  var jrmuiStatics = config.jrmui.statics;

  jrmuiStatics.forEach(function(item) {
    var glob = path.join(jrmuiSrc, item.src, '**/*.{' + item.extensions.join(',') + '}');
    // console.log(filePattern);
    watch(glob, function() {
      require('./' + item.tasks)();
    });
  });
});
