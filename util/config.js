const path = require('path');
const fs = require('fs');
const PLUGIN_PATH = require('./path').PLUGIN_PATH;

const filename = 'config.json';
const filePath = path.join(PLUGIN_PATH, filename);

'use strict';

const formatBoolean = value => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  return value;
};
const requireFile = () => {
  return require(filePath);
};

module.exports.init = () => {
  if (!fs.existsSync(filePath)) {
    const config = {
      template: '',
      // registry: 'https://github.com/nowgoant/gulp-starter-generator.git',
      registry: 'http://source.jd.com/app/mdev.jrmui.generator.git',
      ui: 'http://source.jd.com/app/jrmui.git',
      updateCheck: true,
      github: '',
      author: ''
    };

    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  }
};

module.exports.get = option => {
  if (!option) {
    return requireFile();
  }

  return requireFile()[option];
};

module.exports.set = (option, value) => {
  const config = requireFile();

  if (config[option] !== undefined) {
    config[option] = formatBoolean(value);
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

    return true;
  }

  return false;
};
