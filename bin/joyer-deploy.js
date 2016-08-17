#!/usr/bin/env node

const exec = require('../util/exec');
const UTILPATH = require('../util/path');
const ROOT_PATH = UTILPATH.ROOT_PATH;

'use strict';

require('./joyer-build');

['browserSync'].forEach(function(task) {
  exec('gulp', [task, '--cwd', ROOT_PATH], {
    stdio: 'inherit'
  });
});
