/*jshint esversion: 6 */ // This shit will be removed in future
/*jshint -W061 */ // This shit will be removed in future too BUT if this is not a security issue

require('dotenv').config(); // .env
const fs = require('fs'); // File system
const express = require('express'); // Express
const app = express();
const port = process.env.SERVER_PORT;
const isOnline = require('is-online'); // isOnline

// Get the log and chalk functions
const log = require('./functions.js').log;
const chalk = require('./functions.js').chalk;

// Combine the log and chalk functions
//Log sample message
log('info', 'Sample message');




// Start server 
app.listen(port, () => {
  // Log Starting Server Checks
  log('info', 'Starting Server Checks');

  // Check if Localhost in .env file is true
  if (process.env.LOCALHOST === 'TRUE') {
    // If true, log info message
    log('info', 'Server is running on LOCALHOST, Internet connection is optional');
  } else {
    // If false, log info message
    log('info', 'Server is running on REMOTE, Internet connection is required');
  }

  // Check if debug in .env file is true
  if (process.env.DEBUG === 'TRUE') {
    // Log debug message
    log('debug', 'Debug is enabled');
  }

  // Check if git is installed on the system
  if (fs.existsSync('.git')) {
    // Check git version
    const gitVersion = require('child_process').execSync('git --version').toString().trim();
    // Log info git version
    log('info', 'Git Version: ' + gitVersion);
  } else {
    // Log error git not installed
    log('error', 'Git is not installed');
  }

  // Get all files from /include/
  const files = fs.readdirSync('./modules/');
  // Start log reading include files
  log('info', 'Reading modules');
  // Do a readfilesync on each file
  files.forEach(file => {
    // check if the file is a .js file
    if (file.endsWith('.js')) {
      // require the file
      eval(fs.readFileSync(`./modules/${file}`) + '');
    }
  });
  log('info', 'File Loaded: ' + chalk.bold.underline.red(files));

  // Ask question if user wants to update NPM packages
  log('info', 'Do you want to update NPM packages? (y/N)');
  // Define readlineSync
  const readlineSync = require('readline-sync');
  // Get the answer
  const answer = readlineSync.question();
  // Check if answer is y, set default to n
  if (answer === 'y') {
    // Update NPM packages
    require('child_process').execSync('npm install');
  } else {
    // Log info message
    log('info', 'Skipping NPM Dependencies check');
  }
    //Listen for '.stop' on console
  process.stdin.on('data', function (data) {
    // If '.stop' is typed
    if (data.toString().trim() === '.stop') {
      // Log info server stopped
      log('info', 'Server Stopped');
      // Exit the process
      process.exit(0);
    }
    // If '.mem' is typed
    if (data.toString().trim() === '.mem') {
      // Log info memory usage in MB
      log('info', 'Memory Usage: ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB');
    }

    // If '.modules' is typed
    if (data.toString().trim() === '.modules') {
      // Log info modules
      log('info', 'Modules: ' + files);
    }
  });
    
  // Check if connected to the internet using is-online
  isOnline().then(online => {
    // Log info if connected to the internet
    if (online) {
      log('info', 'Connected to the internet');
      // Check if localhost is true
      if (process.env.LOCALHOST === 'FALSE') {
        // Log info hi
        log('info', 'Hi');

      } else {
        // Log error if something went wrong
        log('error', 'Something went wrong, please check your .env file');
      }
    } else {
      // Log error if not connected to the internet
      log('error', 'Not connected to the internet');
    }
  });
});
// Log info server started
log('info', 'Server Started');



// List out all all api routes
app.get('/', (req, res) => {
  // Log info message
  log('info', 'Listing all routes');
  // List all routes
  res.json({
    '/anime/search/:query': 'Search for anime',
    '/anime/:id': 'Get anime by id',
    '/anime/:id/episodes': 'Get anime episodes',
    '/anime/:id/characters': 'Get anime characters',
    '/anime/:id/reviews': 'Get anime reviews',
    '/anime/:id/recommendations': 'Get anime recommendations',
    '/anime/:id/stats': 'Get anime stats',
    '/anime/:id/moreinfo': 'Get anime moreinfo',
    '/anime/:id/news': 'Get anime news',
    '/anime/:id/pictures': 'Get anime pictures',
  })
});
