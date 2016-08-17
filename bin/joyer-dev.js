#!/usr/bin/env node

const logger = require('../util/logger');
const program = require('commander').parse(process.argv);
const exec = require('../util/exec');
const UTILPATH = require('../util/path');
const ROOT_PATH = UTILPATH.ROOT_PATH;
const CWD_PATH = UTILPATH.CWD_PATH;

'use strict';

//set env
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = program.args[0] || 'development';
}

logger.log('环境变量process.env.NODE_ENV:', process.env.NODE_ENV);

process.env.CWD_PATH = CWD_PATH;

exec('gulp', ['--cwd', ROOT_PATH], {
  stdio: 'inherit'
});
