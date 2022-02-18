/** Dependencies */
const express = require('express');
const app = express();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

/** Main  */
const version = 'main';
const indexRouter = require(`./routes/${version}.js`);

/** Error Handling */
const errorHandler = require('./middleware/errorHandler.js');


/** Security Parameters */
app.use(logger('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** Load Routes */
app.use(`/`, indexRouter);


/** Catch 404 */
app.use((req, res, next) => {
  next(createError(404));
});

// Pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;
