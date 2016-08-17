var compress = require('compression');
var program = require('commander');
var config = require(program.config || require('../joyer.config')());
var express = require('express');
var gulp = require('gulp');
var gutil = require('gulp-util');
var logger = require('morgan');
var open = require('open');
var path = require('path');

var settings = {
  root: path.resolve(process.env.CWD_PATH, config.root.dest),
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

gulp.task('server', function() {
  var url = 'http://localhost:' + settings.port;

  express()
    .use(compress())
    .use(logger(settings.logLevel))
    .use('/', express.static(settings.root, settings.staticOptions))
    .listen(settings.port);

  gutil.log('production server started on ' + gutil.colors.green(url));
  open(url);
});
