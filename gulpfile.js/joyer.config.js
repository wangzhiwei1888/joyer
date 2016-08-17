const path = require('path');

module.exports = function() {
  var config = path.join(process.env.CWD_PATH || process.cwd(), 'joyer.config');
  return config;
};
