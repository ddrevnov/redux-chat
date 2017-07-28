const faker = require('faker');
const BaseFactory = require('./base.factory');
const mongoose = require('mongoose');

class RoomFactory extends BaseFactory {
  /**
   * Create a room
   *
   * @public
   * @param {Object} attrs of user
   * @returns {Object} a fake user
   */
  generate(attrs) {
    return {
      name: `${faker.random.word()}`,
      creator: mongoose.Types.ObjectId(),
      ...attrs,
    };
  }
}

module.exports = new RoomFactory();
