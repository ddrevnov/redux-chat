const supertest = require('supertest');
const server = require('../../index');

require('../../config/database');

module.exports = supertest(server);
