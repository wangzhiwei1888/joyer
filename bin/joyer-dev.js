#!/usr/bin/env node

const logger = require('../util/logger');
const program = require('commander').parse(process.argv);
const exec = require('../util/exec');
const CWD_PATH = require('../util/path').CWD_PATH;

'use strict';

//set env
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = program.args[0] || 'development';
}
logger.log('环境变量process.env.NODE_ENV:', process.env.NODE_ENV);

exec('gulp', ['--cwd', CWD_PATH], {
  stdio: 'inherit'
});
