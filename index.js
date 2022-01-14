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
const { ConLog } = require('./functions.js');

/**
 * @title ServerCheckInit
 * @author NWJ9PB
 * @description Check dependencies, core and config files
 * @version 0.0.2-cuttingedge
 */
//TODO: Convert as one function

// Check if .env file loaded
if (!fs.existsSync('.env')) {
  ConLog('error', 'server', 'No .env file found, please create one');
  process.exit(1);
}

// Check if git is present (Experimental, may be removed in future) 
ConLog('info', 'server', 'Checking for git');
if (fs.existsSync('.git')) {
  ConLog('log', 'server', 'Git is present');
} else {
  ConLog('error', 'node', 'Git is not present, exiting');
  process.exit(1);
}

// Check if node_modules is present
ConLog('info', 'node', 'Checking if node_modules is present');
if (fs.existsSync('node_modules')) {
  ConLog('info', 'node', 'node_modules is present');
  // Print dependencies of node_modules
  ConLog('info', 'node', 'Listing dependencies folder');
  const nodeModules = fs.readdirSync('node_modules');
  for (let i = 0; i < nodeModules.length; i++) {
    ConLog('info', 'node', chalk.bgBlack.yellowBright.bold('FSREAD > ') + nodeModules[i]);
  }
} else {
  ConLog('error', 'node', 'Something went wrong, exiting');
  process.exit(1);
}

// Check internet connection
ConLog('info', 'node', 'Checking internet connection');
isOnline().then(online => {
  if (online) {
    ConLog('info', 'network', 'Connected to the internet');
  } else {
    ConLog('error', 'network', 'Not connected to the internet, exiting');
    process.exit(1);
  }
});

// Check all endpoints
ConLog('info', 'node', 'Checking endpoints');
fs.readdirSync('./endpoints').forEach(file => {
  ConLog('info', 'server', 'Found endpoint: ' + chalk.bgMagenta(file));
});

// Check port if it is in use
ConLog('info', 'node', 'Checking port');
if (API_PORT === undefined) {
  ConLog('error', 'node', 'Port is undefined, exiting');
  process.exit(1);
} else {
  ConLog('info', 'node', 'Port is defined');
}

// Check if port is in use by another process
ConLog('info', 'node', 'Checking if port is in use');
if (require('fs').existsSync('/tmp/app.pid')) {
  ConLog('error', 'node', 'Port is in use, exiting');
  process.exit(1);
} else {
  ConLog('info', 'node', 'Port is not in use');
}

// Get  current git signature and branch
const sha1 = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
ConLog('info', 'node', 'Current Git Signature: ' + chalk.red(sha1));
ConLog('info', 'node', 'Current Git Branch: ' + chalk.red(require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim()));

app.listen(API_PORT, () => {
  ConLog('node', 'server', 'Server started on port ' + chalk.redBright.bgBlack.bold(API_PORT));
});

/**
 * @title List of endpoints
 * @author NWJ9PB
 * @description List out all endpoints
 * @version 0.0.2-cuttingedge
 */

// Add endpoints/anime.js
const anime = require('./endpoints/anime.js');
const { log } = require('console');

// List out all all api routes
app.get('/', (req, res) => {
  // Log the request
  ConLog('log', 'client', 'Request received');
  // List all routes
  res.json({
    '/anime/': 'MyAnimeList API/Lookup',
    '/nyaa/': 'Nyaa.si API/Lookup',
  });
});

// Catch all undefined routes
app.get('*', (req, res) => {
  // Log the request
  ConLog('log', 'client', 'Request received');
  // Send 'status: 404' as json
  res.json({
    status: 404,
  });
});
