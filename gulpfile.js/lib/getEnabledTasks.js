var compact = require('lodash/array/compact');
var program = require('commander');
var config = require(program.config || require('./../joyer.config')());
  // Grouped by what can run in parallel
var assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite'];
var codeTasks = ['html', 'css', 'js'];

module.exports = function(env) {
  var jsTasks = {
    watch: 'webpack:watch',
    development: 'webpack:development',
    production: 'webpack:production'
  };

  var matchFilter = function(task) {
    if (config.tasks[task]) {
      if (task === 'js') {
        task = jsTasks[env] || jsTask.watch;
      }
      return task;
    }
  };

  return {
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  };
};
