var path = require('path');
var program = require('commander');
var config = require(program.config || require('../joyer.config')());

module.exports = {
  assetsPath: function(_path) {
    console.log(_path);
    var assetsSubDirectory = path.join(process.env.CWD_PATH, config.root.dest, config.tasks.images.dest, _path);
    console.log(assetsSubDirectory);
    return assetsSubDirectory;
  }
};
