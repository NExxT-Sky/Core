/**
 * @project_title - SkyCore
 * @project_description - A multipurpose API framework, primarily for anime related projects of Sky Projects
 */

/**
 * @title Dependencies
 * @description Importing dependencies, nothing else
 */

// Dependencies
const { fs, express, app, isOnline, readlineSync, chalk, os, path } = require('./deps.js');

// Config
const { API_PORT } = require('./config.js');

// Functions
const { alog } = require('./functions.js');

/**
 * @title ServerCheckInit
 * @author NWJ9PB
 * @description Check dependencies, core and config files
 * @version 0.0.2-cuttingedge
 */
//TODO: Convert as one function

// Check if .env file loaded
if (!fs.existsSync('.env')) {
  alog('error', 'server', 'No .env file found, please create one');
  process.exit(1);
}

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
    alog('info', 'node', chalk.yellow.bold('FSREAD ')+'Found module: ' + chalk.red(file));
  });
} else {
  alog('error', 'node', 'node_modules is not present, please run npm install, exiting');
  process.exit(1);
}

// Check internet connection
alog('info', 'node', 'Checking internet connection');
isOnline().then(online => {
  if (online) {
    alog('info', 'network', 'Connected to the internet');
  } else {
    alog('error', 'network', 'Not connected to the internet, exiting');
    process.exit(1);
  }
});

// Check all endpoints
alog('info', 'node', 'Checking endpoints');
fs.readdirSync('./endpoints').forEach(file => {
  alog('info', 'node', 'Found endpoint: ' + chalk.red(file));
});

// Check port if it is in use
alog('info', 'node', 'Checking port');
if (API_PORT === undefined) {
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

// Get  current git signature and branch
const sha1 = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
alog('info', 'node', 'Current Git Signature: ' + chalk.red(sha1));
alog('info', 'node', 'Current Git Branch: ' + chalk.red(require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim()));

app.listen(API_PORT, () => {
  alog('node', 'server', 'Server started on port ' + chalk.redBright.bgBlack.bold(API_PORT));
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
    '/anime/': 'MyAnimeList API/Lookup',
    '/nyaa/': 'Nyaa.si API/Lookup',
  });
});

// Catch all undefined routes
app.get('*', (req, res) => {
  // Log the request
  alog('log', 'client', 'Request received');
  // Send 'status: 404' as json
  res.json({
    status: 404,
  });
});