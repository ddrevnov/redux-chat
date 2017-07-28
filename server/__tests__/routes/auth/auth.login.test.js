const { expect } = require('chai');

const server = require('../../../__mocks__/utils/server.mock');
const User = require('../../../models/user.model');
const UserFactory = require('../../../__mocks__/factories/user.factory');

const ENDPOINT = '/api/users/login';

let testUser;

/**
 * @test {auth.routes.js}
 */
describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });

  describe('login with a status 200', () => {
    it('should return a token with the user _id', async () => {
      const { body, status } = await server.post(ENDPOINT)
        .send({ email: testUser.email, password: 'password1' });

      expect(status).to.equal(200);
      expect(body._id).to.equal(testUser._id.toString());
      expect(body).to.haveOwnProperty('token');
    });
  });

  describe('not login with status 401', () => {
    it('should not allowed user to log with wrong password', async () => {
      const { text, status } = await server.post(ENDPOINT)
        .send({ email: testUser.email, password: 'passwwejnwg3' });

          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
    });
  });
});
