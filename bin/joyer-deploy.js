#!/usr/bin/env node

const exec = require('../util/exec');
const CWD_PATH = require('../util/path').CWD_PATH;

'use strict';

require('./joyer-build');

['browserSync'].forEach(function(task) {
  exec('gulp', [task, '--cwd', CWD_PATH], {
    stdio: 'inherit'
  });
});
