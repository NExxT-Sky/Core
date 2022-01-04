/*jshint esversion: 6 */ // This shit will be removed in future
/*jshint -W061 */ // This shit will be removed in future too BUT if this is not a security issue, this will remain

/**
 * @title Dependencies
 * @author NWJ9PB
 * @description Load required dependencies
 * @version 0.0.2-cuttingedge
 */

require('dotenv').config(); // .env
const fs = require('fs'); // File system
const express = require('express'); // Express
const app = express();
const port = process.env.SERVER_PORT;
const isOnline = require('is-online'); // isOnline
const readlineSync = require('readline-sync'); // readlineSync
const chalk = require('chalk'); // Chalk


// Custom functions
const { alog } = require('./functions.js');

/**
 * @title ServerCheckInit
 * @author NWJ9PB
 * @description Check dependencies, core and config files
 * @version 0.0.2-cuttingedge
 */

// Check if git is present (Experimental, may be removed in future) 
alog('info', 'node', 'Checking if git is present');
if (fs.existsSync('.git')) {
  alog('info', 'node', 'Git is present');
} else {
  alog('error', 'node', 'Git is not present, exiting');
  process.exit(1);
}

// Check if node_modules is present
alog('info', 'node', 'Checking if node_modules is present');
if (fs.existsSync('node_modules')) {
  alog('info', 'node', 'node_modules is present');
  // List out the modules
  fs.readdirSync('node_modules').forEach(file => {
    alog('info', 'node', 'Found module: ' + chalk.red(file));
  });
} else {
  alog('error', 'node', 'node_modules is not present, please run npm install, exiting');
  process.exit(1);
}

// Check internet connection
alog('info', 'node', 'Checking internet connection');
isOnline().then(online => {
  if (online) {
    alog('info', 'network', 'Internet connection is online');
  } else {
    alog('error', 'network', 'Internet connection is offline, exiting');
    process.exit(1);
  }
});

// Check all endpoints
alog('info', 'node', 'Checking endpoints');
fs.readdirSync('./modules').forEach(file => {
  alog('info', 'node', 'Found endpoint: ' + chalk.red(file));
});

// Check port if it is in use
alog('info', 'node', 'Checking port');
if (port === undefined) {
  alog('error', 'node', 'Port is undefined, exiting');
  process.exit(1);
} else {
  alog('info', 'node', 'Port is defined');
}

// Check if port is in use by another process
alog('info', 'node', 'Checking if port is in use');
if (require('fs').existsSync('/tmp/app.pid')) {
  alog('error', 'node', 'Port is in use, exiting');
  process.exit(1);
} else {
  alog('info', 'node', 'Port is not in use');
}

app.listen(port, () => {
  alog('node', 'server', 'Server started on port ' + chalk.redBright.bgBlack.bold(port));
  
});


/**
 * @title List of endpoints
 * @author NWJ9PB
 * @description List out all endpoints
 * @version 0.0.2-cuttingedge
 */

// List out all all api routes
app.get('/', (req, res) => {
  // Log the request
  alog('log', 'client', 'Request received');
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
  });
});
