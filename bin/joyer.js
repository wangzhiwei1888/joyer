#!/usr/bin/env node

'use strict';

const path = require('path');
const program = require('commander');
const PATH = require('../util/path');
const check = require('../util/check');
const config = require('../util/config');
const chalk = require('chalk');
const pkg = require('./../package.json');

check.initPluginPackage()
config.init()

try {
  check.checkPermission()
} catch (_) {
  logger.fatal(`chalk.yellow('permission denied')
    尝试使用 ${chalk.cyan('sudo')} 或者执行下面指令修改访问权限

    ${chalk.cyan('sudo chown -R $USER:$(id -gn $USER) ' + PATH.PLUGIN_PATH)}
    `)
}

if (config.get('updateCheck')) {
  check.checkVersion()
}

// hack
// https://gist.github.com/branneman/8048520#6-the-hack
process.env['NODE_PATH'] = (process.env['NODE_PATH'] || '') + [
  '',
  path.join(PATH.CWD_PATH, 'node_modules'),
  path.join(PATH.ROOT_PATH, 'node_modules'),
  path.join(PATH.PLUGIN_PATH, 'node_modules'),
  PATH.LIB_PATH
].join(path.delimiter)

require('module').Module._initPaths()

program
// .allowUnknownOption() //是否启动自动报错机制
  .usage('<command> [options]')
  .version(pkg.version)
  .command('config <option>', '查看当前项目的配置信息')
  .command('init', '初始化一个空项目')
  .command('build', '编译')
  .command('deploy', '发布')
  .parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp()
}
