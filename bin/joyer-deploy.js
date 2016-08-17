#!/usr/bin/env node

'use strict'

const exec = require('../util/exec');
const CWD_PATH = require('../util/path').CWD_PATH;

require('./joyer-build');

['browserSync'].forEach(function(task) {
  exec('gulp', [task, '--cwd', CWD_PATH], {
    stdio: 'inherit'
  });
});
