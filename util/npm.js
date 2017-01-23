const shelljs = require('shelljs');
const exec = require('./exec');
const PLUGIN_PATH = require('./path').PLUGIN_PATH;
const checkRegistry = require('./check').registry;
const config = require('./config');
const commands = require('./npm-commands.json');
const pm = commands[require('./config').get('pm')] || commands.npm;

'use strict';

const npm = (options, registry) => {
  registry = registry || config.get('registry');

  if (registry) {
    options.push(checkRegistry(registry));
  }

  const pwd = shelljs.pwd().stdout;

  shelljs.cd(PLUGIN_PATH);
  options = options.concat(['--save', '--silent', '--save-prefix=>=']);
  exec(pm.name, options, {stdio: 'inherit'});
  shelljs.cd(pwd);
};

module.exports.install = (name, registry) => npm([pm.install].concat(name), registry);
module.exports.update = (name, registry) => npm([pm.update].concat(name), registry);
module.exports.uninstall = name => npm([pm.uninstall].concat(name));
module.exports.list = () => npm(['list', '--depth=0']);
