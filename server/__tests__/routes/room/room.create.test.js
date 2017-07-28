const { expect } = require('chai');

const server = require('../../../__mocks__/utils/server.mock');

const Room = require('../../../models/room.model');
const User = require('../../../models/user.model');

const RoomFactory = require('../../../__mocks__/factories/room.factory');
const UserFactory = require('../../../__mocks__/factories/user.factory');

const ENDPOINT = '/api/rooms';

let testRoom;
let token;
let authorizationHeader = {};

describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    await Room.remove();

    let { body } = await server.post('/api/users/signup').send(UserFactory.generate());

    authorizationHeader.authorization = body.token;
  });

  describe('Create with status 201', () => {
    it('should return room object', async () => {

      const { status, body } = await server.post(ENDPOINT)
        .set(authorizationHeader)
        .send(RoomFactory.generate());

      expect(status).to.equal(201);
      expect(body).to.haveOwnProperty('name');
      expect(body).to.haveOwnProperty('creator');
    });
  });

  describe('Error with status 400', () => {
    it('should return an error if name is not provided', async () => {
      let creator = RoomFactory.generate().creator;

      const { status, body } = await server.post(ENDPOINT)
        .set(authorizationHeader)
        .send({ creator });

      expect(status).to.equal(400);
      expect(body.message).to.equal('validation error');
      expect(body.errors.name).to.equal('name is required');
    });

    it('should return an error if name is not a string', async () => {
      const { status, body } = await server.post(ENDPOINT)
        .set(authorizationHeader)
        .send({ name: 10 });

      expect(status).to.equal(400);
      expect(body.message).to.equal('validation error');
      expect(body.errors.name).to.equal('name must be a string');
    });
  });
});