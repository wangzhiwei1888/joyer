const format = require('util').format;
const chalk = require('chalk');

/**
 * Prefix.
 */
const prefix = '[joyer]';
const sep = chalk.gray('-');
'use strict';

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
module.exports.log = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.cyan(prefix), sep, msg);
};

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
module.exports.fatal = function(message) {
  module.exports.error(message);

  if (process.env.NODE_ENV === 'testing') {
    throw new Error('exit');
  } else {
    /* istanbul ignore next */
    process.exit(1);
  }
};

/**
 * Log an error `message` to the console and no exit.
 *
 * @param {String} message
 */
module.exports.error = function(message) {
  if (message instanceof Error) {
    message = message.message.trim();
  }

  const msg = format.apply(format, arguments);
  console.error(chalk.red(prefix), sep, msg);
};

module.exports.warn = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.yellow(prefix), sep, msg);
};

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
module.exports.success = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.green(prefix), sep, msg);
};
