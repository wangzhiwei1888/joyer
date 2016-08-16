'use strict'

const path = require('path')
const fs = require('fs')
const updateNotifier = require('update-notifier')
const shelljs = require('shelljs')
const pkg = require('../package.json')
const PLUGIN_PATH = require('./path').PLUGIN_PATH

exports.registry = registry => {
  if (!registry) {
    return ''
  }

  return '--registry=' + registry
}

/* istanbul ignore next */
exports.initPluginPackage = () => {
  if (!fs.existsSync(PLUGIN_PATH)) {
    fs.mkdirSync(PLUGIN_PATH)
  }

  var pluginPkg = path.join(PLUGIN_PATH, 'package.json')

  if (!fs.existsSync(pluginPkg)) {
    fs.writeFileSync(pluginPkg, '{}')
  }
}

/* istanbul ignore next */
exports.checkPermission = () => {
  const tmpFile = path.join(PLUGIN_PATH, 'tmp')

  fs.writeFileSync(path.join(PLUGIN_PATH, 'tmp'))
  shelljs.rm(tmpFile)
}

/* istanbul ignore next */
exports.checkVersion = () => {
  var notifier = updateNotifier({pkg})

  notifier.notify()
  if (notifier.update) {
    console.log(notifier.update)
  }
}

/* istanbul ignore next */
exports.pluginExists = name => {
  return fs.existsSync(path.join(PLUGIN_PATH, 'node_modules', name))
}
