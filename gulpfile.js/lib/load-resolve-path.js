'use strict'

const path = require('path')

const rootPath = [
  path.join(process.env.CWD_PATH, 'node_modules')  
]
const fallback = [
  path.join(path.join(__dirname, '../../'), 'node_modules')
]

module.exports = config => {
  config.resolve = config.resolve || {}
  config.resolveLoader = config.resolveLoader || {}

  config.resolve.root = (config.resolve.root || []).concat(rootPath)
  config.resolve.fallback = (config.resolve.fallback || []).concat(fallback)
  config.resolveLoader.root = (config.resolveLoader.root || []).concat(rootPath)
  config.resolveLoader.fallback = (config.resolveLoader.fallback || []).concat(fallback)
}
