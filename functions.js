/*jshint esversion: 6 */ // This shit will be removed in future
/*jshint -W061 */ // This shit will be removed in future too BUT if this is not a security issue, this will remain

// Import dependencies
const { chalk, os, table, fs, path } = require('./deps.js');

/**
 * @title ConLog
 * @author NWJ9PB
 * @description Logs messages to console with colors
 * @version 0.0.3-cuttingedge
 * 
 * @param {string} class - Name of class to be logged
 * @param {string} type - Name of type to be logged
 * @param {string} message - The message to be logged
 */

const ConLog = (className, type, message) => {
  className = className.toLowerCase();
  className = className.padEnd(8, ' ');

  type = type.toLowerCase();
  type = type.padEnd(8, ' ');

  // Switch statement for class for colors
  switch (className) {
    case 'node':
      className = chalk.bgBlack.blueBright.bold('NODE');
      break;
    case 'server':
      className = chalk.bgBlack.yellow.bold('SERVER');
      break;
    case 'client':
      className = chalk.bgBlack.cyan.bold('CLIENT');
      break;
    case 'database':
      className = chalk.bgBlack.cyan.bold('DATABASE');
      break;
    case 'network':
      className = chalk.bgBlack.blue.bold('NETWORK');
      break;
    default:
      className = chalk.bgBlack.white.bold(className.toUpperCase());
  }

  // Switch statement for type for colors
  switch (type) {
    case 'INFO':
      type = chalk.bgBlack.white.bold('INFO');
      break;
    case 'ERROR':
      type = chalk.bgRed.white.bold('ERROR');
      break;
    case 'WARN':
      type = chalk.bgYellow.red.bold('WARN');
      break;
    default:
      type = chalk.bgBlack.white.bold(type.toUpperCase());
  }

  const logDate = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');

  // Log message on console
  console.log(chalk.black.bold('[' + logDate + '] ') + className + chalk.bgBlack(' > ') + type + chalk.bgBlack(' > ') + chalk.bgBlack.white(message));
  
  //TODO: Log message to file, with ability to just append, instead of overwriting or creating new file

  // Log message to file
  //fs.appendFileSync('./logs/log.txt', '[' + logDate + '] ' + className + ' > ' + type + ' > ' + message + '\n');
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
  ConLog,
};
