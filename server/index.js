/* eslint-disable no-console */
/**
 * Server setup
 */
const express = require('express');
require('./config/database');
const middlewaresConfig = require('./config/middlewares');
const ApiRoutes = require('./routes');
const config = require('config');

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(config.get('port'), err => {
    if (err) {
      console.error('Cannot run');
    } else {
      console.log(`
        Yep this is working
        App listen on port: ${config.get('port')}
        Env: ${process.env.NODE_ENV}
      `);
    }
  });
}

module.exports = app;
