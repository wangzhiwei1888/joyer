#!/usr/bin/env node

'use strict'

const logger = require('../util/logger')
const program = require('commander').parse(process.argv)
const exec = require('../util/exec')
const CWD_PATH = require('../util/path').CWD_PATH
const shelljs = require('shelljs')
const path = require('path');

logger.log(path.join(CWD_PATH))
  // logger.log(path.join(CWD_PATH, 'joyer.config.json'))
shelljs.cd(CWD_PATH);

exec('gulp', ['production'], {
  stdio: 'inherit'
});

exec('gulp', ['zip'], {
  stdio: 'inherit'
});
