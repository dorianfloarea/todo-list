const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

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
