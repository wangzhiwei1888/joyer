const path = require('path');

module.exports = function() {
  // return path.join(path.dirname(__filename), 'joyer.config.json');
  var config = path.join(process.cwd(), 'joyer.config');
  console.log(config);
  return require(config);
}
