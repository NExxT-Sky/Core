/*jshint esversion: 6 */ // This shit will be removed in future
/*jshint -W061 */ // This shit will be removed in future too BUT if this is not a security issue, this will remain

// Import chalk dependency
const { chalk, os, table, fs, path } = require('./deps.js');

/**
* @title ConsoleLogger
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
    lclass =  chalk.bgBlack.blueBright.bold(' NODE ');
    break;
    case 'server':
    lclass =  chalk.bgBlack.yellow.bold(' SRV  ');
    break;
    case 'client':
    lclass = chalk.bgBlack.white.bold(' CNT  ');
    break;
    case 'database':
    lclass = chalk.bgBlack.cyan.bold(' DB   ');
    break;
    case 'network':
    lclass = chalk.bgBlack.blue.bold(' NET  ');
    break;
    default:
    lclass =  chalk.bgBlack.black.bold(' LOG  ');
  }
  
  switch (type) {
    case 'info':
    ltype =  chalk.bgBlackBright.white.bold(' INFO ');
    break;
    case 'error':
    ltype = chalk.bgRedBright(' ERROR');
    break;
    case 'warn':
    ltype =  chalk.bgYellow.red.bold(' WARN ');
    break;
    case 'debug':
    ltype = chalk.bgCyan.inverse.bold(' DEBUG');
    break;
    case 'fatal':
    ltype = chalk.bgRedBright(' FATAL');
    break;
    case 'log':
    ltype =  chalk.bgBlackBright(' LOG  ');
    break;
    default:
    ltype =  chalk.bgBlackBright.white.bold(' INFO ');
  }
  
  console.log(chalk.gray('['+ new Date().toISOString() +']') + lclass +chalk.bgBlack.bold('=>')+ ltype +chalk.bgBlack.bold('=> ')+ message);
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
      // Create a table for memory usage
      const memTable = new table({
        head: ['Memory', 'Used', 'Free', 'Total'],
        colWidths: [10, 20, 20, 20]
      });
      // Get memory usage
      const mem = process.memoryUsage();
      // Add memory usage to table
      memTable.push([
        'Heap',
        (mem.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
        'N/A',
        (mem.heapTotal / 1024 / 1024).toFixed(2) + ' MB'
      ]);
      memTable.push([
        'RSS',
        (mem.rss / 1024 / 1024).toFixed(2) + ' MB',
        'N/A',
        'N/A',
      ]);
      memTable.push([
        'External',
        (mem.external / 1024 / 1024).toFixed(2) + ' MB',
        'N/A',
        'N/A',
      ]);
      // Add system memory usage to table
      memTable.push([
        'System',
        'N/A',
        (os.freemem() / 1024 / 1024).toFixed(2) + ' MB',
        (os.totalmem() / 1024 / 1024).toFixed(2) + ' MB',
      ]);
      // Print table
      console.log(memTable.toString());
      break;
    
    // List out all endpoints files
    case 'endpoints':
      // Create a table for endpoints
      const endpointsTable = new table({
        head: ['Endpoint', 'Description'],
        colWidths: [20, 30]
      });
      // Get all files in endpoints folder
      const files = fs.readdirSync('./endpoints');
      // Loop through files
      for (let i = 0; i < files.length; i++) {
        // Get file name
        const file = files[i];
        // Get file extension
        const ext = path.extname(file);
        // Check if file is a js file
        if (ext === '.js') {
          // Get file name without extension
          const name = path.basename(file, ext);
          // Add file to table
          // Description is /{filename}/
          endpointsTable.push([name, '/' + name]);
        }
      }

      // Print table
      console.log(endpointsTable.toString());
      break;

    // Intentional fail
    case 'color.test':
      // Check if DEBUG is enabled
      if (process.env.DEBUG) {
        // Intentional fail
        alog('fatal', 'server', 'COLOR TEST');
        alog('error', 'server', 'COLOR TEST');
        alog('warn', 'server', 'COLOR TEST');
      } else {
        // Log error
        alog('error', 'server', 'This command is not available in production mode');
      }

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

/**
 * @title Server_Self_Test
 * @author NWJ9PB
 * @description Do a self test on the server
 * @version 0.0.1-cuttingedge
 * @license MIT
 */

// TODO: Takeover the traditional self test and create a new one to make only one line call on index.js
    
// Export all the functions
module.exports = {
  alog,
};
