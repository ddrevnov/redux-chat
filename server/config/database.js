/* eslint-disable no-console */

const mongoose = require('mongoose');
const config = require('config');
const isTest = process.env.NODE_ENV === 'test';

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', config.get('mongooseDebug'));

// Connect the db with the url provide
let db;

try {
  db = mongoose.connect(config.get('mongoUrl'), {
    useMongoClient: true,
  });
} catch (err) {
  db = mongoose.createConnection(config.get('mongoUrl'), {
    useMongoClient: true,
  });
}

db
  .then(async (db) => {
    if (isTest) {
      await db.dropDatabase();
      console.log('db was dropped');
    }

    console.log('MongoDB Running');
  })
  .catch(e => {
    throw e;
  });
