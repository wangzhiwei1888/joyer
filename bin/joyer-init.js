#!/usr/bin/env node

'use strict'

const path = require('path')
const program = require('commander')
const exec = require('../util/exec')
const logger = require('../util/logger')
const isInstalled = require('../util/is-installed')
const config = require('../util/config')
const shelljs = require('shelljs')
const fs = require('fs')

program
  .option('-r --registry <registry-url>', '指定镜像')
  .parse(process.argv);

const projectName = program.args[0];
const ui = config.get('ui');

program.registry = program.registry || config.get('registry');


if (!projectName) {
  logger.fatal('必须输入项目名称')
}

if (!fs.existsSync(projectName)) {
  shelljs.mkdir(projectName)
  logger.log('mkdir ', projectName)
}

if (!program.registry) {
  logger.fatal('请指定脚手架')
}

const installTemplate = () => {
  if (program.registry) {
    logger.log('开始下载：git clone ' + program.registry);

    exec('git', ['clone', program.registry, projectName], {
      stdio: 'inherit'
    });

    logger.success('下载成功\n');

  }

  shelljs.cd(projectName);

  if (ui) {
    logger.log('开始下载：git clone ' + ui);

    exec('git', ['clone', ui], {
      stdio: 'inherit'
    });

    logger.success('下载成功\n');
  }


  if (fs.existsSync('package.json')) {
    logger.log('开始安装：npm install');

    exec('npm', ['install'], {
      stdio: 'inherit'
    });

    logger.success('安装成功\n')
  }
}

installTemplate();
