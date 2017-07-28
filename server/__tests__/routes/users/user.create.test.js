const { expect } = require('chai');

const server = require('../../../__mocks__/utils/server.mock');
const User = require('../../../models/user.model');
const UserFactory = require('../../../__mocks__/factories/user.factory');

const ENDPOINT = '/api/users/signup';

let testUser;

describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });

  describe('Create with status 201', () => {
    it('should return the _id of the user and a token', async () => {
      const { status, body } = await server.post(ENDPOINT).send(UserFactory.generate());

      expect(status).to.equal(201);
      expect(body).to.haveOwnProperty('_id');
      expect(body).to.haveOwnProperty('token');
    });
  });

  describe('Error with status 400', () => {
    it('should return an error if email or username are already take', async () => {
      const { status, body } = await server.post(ENDPOINT)
        .send({
          username: testUser.username,
          email: testUser.email,
          password: 'password1',
        });

      expect(status).to.equal(400);
      expect(body.message).to.contains('User validation failed');
      expect(body.errors.username).to.equal(
        `${testUser.username} already taken!`,
      );
      expect(body.errors.email).to.equal(
        `${testUser.email} already taken!`,
      );
    });

    it('should return an error if email is not provided', async () => {
      const { status, body } = await server.post(ENDPOINT)
        .send({ username: 'username', password: 'password1' });

      expect(status).to.equal(400);
      expect(body.message).to.equal('validation error');
      expect(body.errors.email).to.equal('email is required');
    });

    it('should return an error if password is not provided', async () => {
      const { status, body } = await server.post(ENDPOINT)
        .send({ username: 'username', email: 'user@gmail.com' });

      expect(status).to.equal(400);
      expect(body.message).to.equal('validation error');
      expect(body.errors.password).to.equal('password is required');
    });

    it('should return an error if email is not a valid email', async () => {
      const { status, body } = await server.post(ENDPOINT)
        .send({
          username: 'username',
          email: 'user@gmai',
          password: 'password1',
        });

      expect(status).to.equal(400);
      expect(body.message).to.contains('User validation failed');
      expect(body.errors.email).to.equal('user@gmai is not a valid email!');
    });

    it('should return an error if password is not a good enough', async () => {
      const { status, body } = await server.post(ENDPOINT)
        .send({
          username: 'username',
          email: 'user@gmail.com',
          password: 'pass',
        });

      expect(status).to.equal(400);
      expect(body.message).to.equal('validation error');
      expect(body.errors.password).to.equal(
        'password length must be at least 6 characters long',
      );
    });
  });
});
