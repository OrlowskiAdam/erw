const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const BaseRoutes = require('./middlewares/router');
const logger = require('./logger');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');

/******************************************************************************
 *                          ENVIRONMENT SETUP
 ******************************************************************************/

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  process.env.PORT = 3000;
} else {
  process.env.HTTP_PORT = process.env.HTTP_PORT || 3000;
}

function onUnhandledError(err) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
    console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

/******************************************************************************
 *                               APP USE(
 ******************************************************************************/
// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());
app.use(cookieParser());
app.use(logger.expressMiddleware);
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'session',
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

// cors
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

/******************************************************************************
 *                         DATABASE CONNECTION
 ******************************************************************************/
// mongoose.connect(keys.MONGODB_URI, () => {
//   console.log('connected to mongo db');
// });

/******************************************************************************
 *                               ROUTES
 ******************************************************************************/
// application routes
BaseRoutes(app);
setupAppRoutes(app);

/******************************************************************************
 *                               LISTEN
 ******************************************************************************/
http.createServer(app).listen(process.env.PORT, () => {
  logger.info(`HTTP server is now running on http://localhost:${process.env.PORT}`);
});
