const express = require('express');
const logger = require('morgan');
const app = express();
const config = require('./config');

if (config.app.env !== 'test') {
  app.use(logger('combined'));
}
app.use(express.json());

// routing
const {itemsRoutes} = require('./routes');
const {itemsController} = require('./container');
app.use('/items', itemsRoutes({itemsController}));

// error handler
const errorHandlers = require('./errors/handlers');
app.use(errorHandlers.errorLogger);
app.use(errorHandlers.errorMapper);
app.use(errorHandlers.failSafe);

module.exports = app;
