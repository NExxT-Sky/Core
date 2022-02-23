/** Dependencies */
const express = require('express');
const app = express();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const responseTime = require('response-time')
const fs = require('fs');

/** Main  */
const version = 'main';
const indexRouter = require(`./routes/${version}.js`);

/** Error Handling */
const errorHandler = require('./middleware/errorHandler.js');

/** Logging Utility */
app.use(logger('common', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(logger('tiny'));

/** Security Parameters */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());

/** Load Routes */
app.use('/', indexRouter);


/** Catch 404 */
app.use((req, res, next) => {
  next(createError(404));
});

// Pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;

// Crash the server if you want to leave without triggering the bug
//process.exit(0);
