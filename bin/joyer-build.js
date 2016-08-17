#!/usr/bin/env node

const logger = require('../util/logger');
const program = require('commander').parse(process.argv);
const exec = require('../util/exec');
const CWD_PATH = require('../util/path').CWD_PATH;
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

tasks.forEach(function(task) {
  exec('gulp', [task, '--cwd', CWD_PATH], {
    stdio: 'inherit'
  });
});
