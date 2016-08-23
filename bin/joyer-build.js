#!/usr/bin/env node

const logger = require('../util/logger');
const program = require('commander').parse(process.argv);
const exec = require('../util/exec');
const UTILPATH = require('../util/path');
const ROOT_PATH = UTILPATH.ROOT_PATH;
const CWD_PATH = UTILPATH.CWD_PATH;
const tasks = ['build:production'];

'use strict';

//set env
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = program.args[0] || 'production';
}
logger.log('环境变量process.env.NODE_ENV:', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  tasks.push('zip');
}

//set CWD_PATH
process.env.CWD_PATH = CWD_PATH;

tasks.forEach(function(task) {
  exec('gulp', [task, '--cwd', ROOT_PATH], {
    stdio: 'inherit'
  });
});