// .env
require('dotenv').config();

// FS
const fs = require('fs');

// ExpressJS
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

// Node-color-log
const log = require('node-color-log');
log.bold(true);
log.setDate(() => (new Date()).toLocaleTimeString());

// is-online
const isOnline = require('is-online');

// check if ./include/anime.js exists
if (!fs.existsSync('./include/anime.js')) {
  log.error('./include/anime.js not found');
  process.exit(1);
} else {
  // require ./include/anime.js
  require('./include/anime.js')(anime);
}

// Create sample endpoint
app.get('/test', (req, res) => {
    
  // Output hello world in json format
  res.json({
    hello: 'world'
  });
});





// Start server
app.listen(port, () => {
  // Check if git is installed on the system
  if (fs.existsSync('.git')) {
    // Check git version
    const gitVersion = require('child_process').execSync('git --version').toString().trim();
    // Log info git version
    log.info(`Git version: ${gitVersion}`);
  } else {
    // Log error git not installed
    log.error('Git is not installed on the system');
  }
  
  // Check if connected to the internet using is-online
  isOnline().then(online => {
    // Log info if connected to the internet
    if (online) {
      log.info('Connected to the internet');
    } else {
      log.error('Not connected to the internet');
    }
  });
  
  // Ping google.com every 60 seconds, if fails, log error
  setInterval(() => {
    isOnline().then(online => {
      if (online) {
        log.info('Server still online');
      } else {
        log.error('Server offline');
      }
    });
  }, 60000);
  
  
  
  
  
  // Log that server will starting up
  log.info('Starting server on port ' + port);
});
