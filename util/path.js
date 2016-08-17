const path = require('path');
const homeDir = require('os').homedir();
const ROOT_PATH = path.join(__dirname, '..');
'use strict';
module.exports.CWD_PATH = process.cwd();
module.exports.ROOT_PATH = ROOT_PATH;
module.exports.PLUGIN_PATH = path.join(homeDir, '.joyer');
module.exports.LIB_PATH = path.join(ROOT_PATH, 'lib');
