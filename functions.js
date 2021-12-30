const chalk = require('chalk'); // Chalk
const info = chalk.bold.blue; // Info
const error = chalk.bold.red; // Error
const warn = chalk.bold.yellow; // Warn
const debug = chalk.bold.green; // Debug
const fatal = chalk.bold.red; // Fatal


// Make a switch statement for the type
const log = (type, message) => {
    // Make the 'type' string to all lowercase
    type = type.toLowerCase();


    // Switch statement for the type
    switch (type) {
        // If type is info
        case 'info':
            // Log info message
            console.log(new Date().toLocaleTimeString() + info(' INFO  ') + message);
            break;
        // If type is error
        case 'error':
            // Log error message
            console.log(new Date().toLocaleTimeString() + error(' ERROR ') + message);
            break;
        // If type is warn
        case 'warn':
            // Log warn message
            console.log(new Date().toLocaleTimeString() + warn(' WARN  ') + message);
            break;
        // If type is debug
        case 'debug':
            // Log debug message
            console.log(new Date().toLocaleTimeString() + debug(' DEBUG ') + message);
            break;
        // If type is fatal
        case 'fatal':
            // Log fatal message
            console.log(new Date().toLocaleTimeString() + fatal(' FATAL ') + message);
            process.exit(1);
            break;
        // If type is undefined, log info message
        default:
            console.log(new Date().toLocaleTimeString() + info(' INFO ') + message);
    }
};


// Make 'log' and 'chalk' available to the rest of the program
module.exports = {
    log: log,
    chalk: chalk
};

