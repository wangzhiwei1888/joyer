const path = require('path');

module.exports = function() {
  var config = path.join(process.cwd(), 'joyer.config');
  return config;
}
