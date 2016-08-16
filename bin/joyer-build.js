#!/usr/bin/env node

'use strict'

const logger = require('../util/logger')
const program = require('commander').parse(process.argv)
const exec = require('../util/exec')
const CWD_PATH = require('../util/path').CWD_PATH
const shelljs = require('shelljs')
const path = require('path');

// logger.log(path.join(CWD_PATH))
// logger.log(path.join(CWD_PATH, 'joyer.config.json'))

exec('gulp', ['build:production', '--cwd', CWD_PATH], {
  stdio: 'inherit'
});

// exec('gulp', ['zip', CWD_PATH], {
//   stdio: 'inherit'
// });
