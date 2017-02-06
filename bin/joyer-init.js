#!/usr/bin/env node

const program = require('commander');
const exec = require('../util/exec');
const logger = require('../util/logger');
const config = require('../util/config');
const shelljs = require('shelljs');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const jrmuiName = 'jrmui';
const jrmuiPath = path.join(require('./../util/path').PLUGIN_PATH, jrmuiName);

'use strict';

program
  .option('-r --registry <registry-url>', '指定镜像')
  .parse(process.argv);

const projectName = program.args[0];
const ui = config.get('ui');
const templates = [];

program.registry = program.registry || config.get('registry');

if (!projectName) {
  logger.fatal('必须输入项目名称');
}

if (fs.existsSync(jrmuiPath)) {
  // fs.rmdirSync(jrmuiPath);  
  shelljs.rm('-rf', jrmuiPath);
  logger.log('removed ' + jrmuiPath);
}

if (!fs.existsSync(projectName)) {
  shelljs.mkdir(projectName);
  logger.log('mkdir ', projectName);
}

if (!program.registry) {
  logger.fatal('请指定脚手架');
}


const installTemplate = (template) => {
  if (template) {
    logger.log('开始下载：git clone ' + template);
    exec('git', ['clone', template, projectName], {
      stdio: 'inherit'
    });

    logger.success('下载成功\n');
  }

  shelljs.cd(projectName);

  if (ui) {
    logger.log('开始下载：git clone ' + ui);

    exec('git', ['clone', ui, jrmuiPath], {
      stdio: 'inherit'
    });

    logger.success('clone成功\n');

    logger.log('dir:' + path.join(jrmuiPath, 'src'));
    var mvDir = path.join(process.cwd(), jrmuiName, '/src');
    logger.log('mvDir:', mvDir);

    if (!fs.existsSync(mvDir)) {
      shelljs.mkdir('-p', mvDir);
    }

    shelljs.cp('-Rf', path.join(jrmuiPath, 'src', '/scripts'), mvDir);
    shelljs.cp('-Rf', path.join(jrmuiPath, 'src', '/scss'), mvDir);
    shelljs.cp('-Rf', path.join(jrmuiPath, 'src', '/images/ui'), path.join(process.cwd(), 'src/images/'));

    logger.success('移动成功\n');
  }


  if (fs.existsSync('package.json')) {
    logger.log('开始安装：npm install');

    exec('npm', ['install'], {
      stdio: 'inherit'
    });

    logger.success('安装成功\n');
  }
};


if (typeof program.registry === 'object') {
  for (var key in program.registry) {
    if (key) {
      templates.push(key);
    }
  }
}


if (templates && templates.length) {
  inquirer.prompt([{
    type: 'list',
    name: 'templatekey',
    message: '请指定模板?',
    default: 'default',
    choices: templates
  }]).then(function (answers) {
    console.log('answers.templatekey', answers.templatekey);

    installTemplate(program.registry[answers.templatekey]);
  });

} else {
  installTemplate(program.registry);
}