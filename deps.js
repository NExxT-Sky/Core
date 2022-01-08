require('dotenv').config();
const fs            = require('fs');
const express       = require('express');
const app           = express();
const isOnline      = require('is-online');
const readlineSync  = require('readline-sync');
const chalk         = require('chalk');
const os            = require('os');
const path          = require('path');
const table         = require('cli-table');

module.exports = {
    fs,
    express,
    app,
    isOnline,
    readlineSync,
    chalk,
    os,
    path,
    table,
}