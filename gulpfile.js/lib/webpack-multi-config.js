var program = require('commander')
var config = require(program.config || require('./../joyer.config')())
if (!config.tasks.js) return

var path = require('path')
var webpack = require('webpack')
var webpackManifest = require('./webpackManifest')
// var utils = require('./utils')

module.exports = function (env) {  
  var jsSrc = path.resolve(process.env.CWD_PATH, config.root.src, config.tasks.js.src);
  var jsDest = path.resolve(process.env.CWD_PATH, config.root.dest, config.tasks.js.dest);
  var publicPath = path.join(config.tasks.js.src, '/');
  var rev = config.tasks.production.rev && env === 'production';
  var filenamePattern = rev ? '[name]-[hash].js' : '[name].js'
  var extensions = config.tasks.js.extensions.map(function (extension) {
    return '.' + extension
  })  

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      // root: [jsSrc],
      alias: {
        src: jsSrc
      },
      extensions: [''].concat(extensions)
    },
    module: {
      loaders: [{
        test: /\.js$/,
        // include: process.env.CWD_PATH,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: [
          // 只去解析运行目录下的 src 和 demo 文件夹
          path.resolve(process.env.CWD_PATH, config.root.src),
          path.resolve(process.env.CWD_PATH, 'jrmui')          
        ],
        query: config.tasks.js.babel
      }, {
        test: /\.html$/,
        loader: 'html'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        // query: {
        // limit: 10000,
        // name: utils.assetsPath('[name].[hash:7].[ext]')
        // }
      }]
    },
    htmlLoader: config.tasks.js.htmlLoader
  };

  // install resolve path
  require('./load-resolve-path')(webpackConfig);

  // console.log(webpackConfig);

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      )
    }
  }

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }));

  if (env === 'development') {
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
  }

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(new webpackManifest(publicPath, path.join(process.env.CWD_PATH, config.root.dest)));
    }
    webpackConfig.plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          'drop_debugger': true,
          'drop_console': true,
          warnings: true
        },
        output: {
          comments: false,
          ascii_only: true
        }
      }),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
};