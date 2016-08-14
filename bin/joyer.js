#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander')
var package = require('./../package.json');

program
// .allowUnknownOption() //是否启动自动报错机制
  .version(package.version)
  .option('-b, --build', '编译')
  .option('-d, --deploy', '发布')
  .option('-s, --start [test|minner|pro]', '开发')
  .parse(process.argv)

// console.log('you ordered a pizza with:')

if (program.build) console.log('编译')
if (program.deploy) console.log('发布')

switch (program.start) {
  case 'test':
    console.log('开发 测试环境');
    break;
  case 'pro':
    console.log('开发 生产环境');
    break;
  default:
    console.log('开发 预发环境[默认环境]');
}

// console.log('  - %s cheese', program.cheese)