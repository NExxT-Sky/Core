/*jshint esversion: 6 */ // This shit will be removed in future
/*jshint -W061 */ // This shit will be removed in future too BUT if this is not a security issue, this will remain

const chalk = require('chalk'); // Chalk
const info = chalk.bold.blue; // Info
const error = chalk.bold.red; // Error
const warn = chalk.bold.yellow; // Warn
const debug = chalk.bold.green; // Debug
const fatal = chalk.bold.red; // Fatal

/**
* @title NodeLoggerV2 
* @author NWJ9PB
* @description With added what action is being logged
* @version 0.0.2-cuttingedge
* @license MIT
* 
* @param {string} type - The type of log to be made
* @param {string} aclass - The class of the log
* @param {string} message - The message to be logged
*/

const alog = (type, aclass, message) => {
  type = type.toLowerCase();
  aclass = aclass.toLowerCase();
  
  switch (aclass) {
    case 'node':
    lclass =  info(' NODE ');
    break;
    case 'server':
    lclass =  warn(' SRV  ');
    break;
    case 'client':
    lclass = debug(' CLT  ');
    break;
    case 'database':
    lclass = error(' DB   ');
    break;
    case 'network':
    lclass = fatal(' NET  ');
    break;
    default:
    lclass =  info(' LOG  ');
  }
  
  switch (type) {
    case 'info':
    ltype =  info(' INFO  > ');
    break;
    case 'error':
    ltype = error(' ERROR > ');
    break;
    case 'warn':
    ltype =  warn(' WARN  > ');
    break;
    case 'debug':
    ltype = debug(' DEBUG > ');
    break;
    case 'fatal':
    ltype = fatal(' FATAL > ');
    break;
    case 'log':
    ltype =  info(' LOG   > ');
    break;
    default:
    ltype =  info(' INFO  > ');
  }
  
  console.log(chalk.gray('['+Math.floor(Date.now()/1000)+']') + lclass +chalk.black.bold('=>')+ ltype + message);
  
  
};


/**
* @title SystemConsole
* @author NWJ9PB
* @description Intercept command typed and execute accordingly to preset commands
*/
const stdin = process.openStdin();
stdin.addListener("data", function (d) {
  const cmd = d.toString().trim();
  alog('info', 'node', 'Command: ' + chalk.red(cmd));
  switch (cmd) {
    case 'exit':
    alog('info', 'server', 'Exiting');
    process.exit(0);
    break;
    case 'mem':
    alog('info', 'node', 'RSS Memory:         ' + chalk.red(process.memoryUsage().rss / 1024 / 1024) + ' MB');
    alog('info', 'node', 'Heap Used Memory:   ' + chalk.red(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB');
    alog('info', 'node', 'Heap Total Memory:  ' + chalk.red(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB');
    break;
    case 'help':
    alog('info', 'node', 'Help');
    alog('info', 'node', 'exit - Exits the program');
    alog('info', 'node', 'help - Shows this help');
    break;
    default:
    alog('info', 'node', 'Unknown command');
    alog('info', 'node', 'Type help for a list of commands');
  }
});

// Export all functions
module.exports = {
  alog: alog
};
