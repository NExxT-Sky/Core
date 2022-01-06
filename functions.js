/*jshint esversion: 6 */ // This shit will be removed in future
/*jshint -W061 */ // This shit will be removed in future too BUT if this is not a security issue, this will remain

const chalk = require('chalk');   // Chalk
const info  = chalk.bold.blue;    // Info
const error = chalk.bold.red;     // Error
const warn  = chalk.bold.yellow;  // Warn
const debug = chalk.bold.green;   // Debug
const fatal = chalk.bold.red;     // Fatal

// Import Os from index.js

/**
* @title NodeLogger
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
    ltype =  info(' INFO ');
    break;
    case 'error':
    ltype = error(' ERROR');
    break;
    case 'warn':
    ltype =  warn(' WARN ');
    break;
    case 'debug':
    ltype = debug(' DEBUG');
    break;
    case 'fatal':
    ltype = fatal(' FATAL');
    break;
    case 'log':
    ltype =  info(' LOG  ');
    break;
    default:
    ltype =  info(' INFO ');
  }
  
  console.log(chalk.gray('['+ new Date().toISOString() +']') + lclass +chalk.black.bold('=>')+ ltype +chalk.black.bold('=> ')+ message);
};

/**
* @title ConsoleLogger 
* @author NWJ9PB
* @description With added what action is being logged, This is the new version of the logger, and old one will be removed in future
* @version 0.0.1-cuttingedge
* @license MIT
* 
* @param {string} log_class - The class of the log, either SYSTEM, NODE, SERVER, REQUEST, DATABASE, NETWORK, FILESYSTEM
* @param {string} log_type - The type of log to be made, either LOG, INFO, ERROR, WARN, DEBUG, FATAL, ACCESS, SECURITY, CRITICAL
* @param {string} message - The message to be logged
*/

// Create a sys_log class and create by doing slog.{log_class}.{log_type}(message)
const slog = (log_class, log_type, message) => {
  log_class = log_class.toLowerCase();
  log_type = log_type.toLowerCase();

  switch (log_class) {
    case 'system':
      lclass = chalk.blue.bold            (' SYS ');
      break;
    case 'node':
      lclass = chalk.green.bold           (' NODE');
      break;
    case 'server':
      lclass = chalk.yellow.bold          (' SRV ');
      break;
    case 'request':
      lclass = chalk.cyan.bold            (' REQ ');
      break;
    case 'database':
      lclass = chalk.red.bold             (' DB  ');
      break;
    case 'network':
      lclass = chalk.magenta.bold         (' NET ');
      break;
    case 'filesystem':
      lclass = chalk.white.bold           (' FS  ');
      break;
    default:
      lclass = chalk.redBright.bold       (' LOG ');
  }

  switch (log_type) {
    case 'info':
      ltype = chalk.blue.bold             (' INFO ');
      break;
    case 'error':
      ltype = chalk.red.bold              (' ERR  ');
      break;
    case 'warn':
      ltype = chalk.yellow.bold           (' WARN ');
      break;
    case 'debug':
      ltype = chalk.cyan.bold             (' DBG  ');
      break;
    case 'fatal':
      ltype = chalk.magenta.bold          (' FATAL');
      break;
    case 'log':
      ltype = chalk.blue.bold             (' LOG  ');
      break;      
    case 'access':
      ltype = chalk.green.bold.underline  (' ACC  ');
      break;
    case 'security':
      ltype = chalk.red.bold.underline    (' SEC  ');
      break;
    case 'critical':
      ltype = chalk.red.bold.underline    (' CRIT');
    default:
      ltype = chalk.blue.bold             (' INFO ');
  }

  UtcDate = new Date().toISOString();
  console.log(chalk.gray('[' + UtcDate + ']') + lclass + chalk.black.bold('=>') + ltype + chalk.black.bold('=> ') + message);
};

/**
* @title ConsoleInterpreter
* @author NWJ9PB
* @description Intercept command typed and execute accordingly to preset commands
*/

const sysConsole = process.openStdin();
sysConsole.addListener("data", function (d) {
  const cmd = d.toString().trim();
  alog('info', 'node', 'Command: ' + chalk.red(cmd));
  switch (cmd) {
    case 'exit':
      alog('info', 'server', 'Exiting');
      process.exit(0);
      break;
    case 'rs':
      alog('info', 'server', 'Nodemon restart command received, restarting...');
      process.exit(0);
    case 'mem':
      alog('info', 'node', 'RSS Memory:         ' + chalk.red(process.memoryUsage().rss / 1024 / 1024) + ' MB');
      alog('info', 'node', 'Heap Used Memory:   ' + chalk.red(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB');
      alog('info', 'node', 'Heap Total Memory:  ' + chalk.red(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB');
      // Show machine memory usage
      alog('info', 'node', 'Machine Memory:     ' + chalk.red(os.totalmem() / 1024 / 1024) + ' MB');
      
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

// Export all the functions
module.exports = {
  alog,
  slog
};
