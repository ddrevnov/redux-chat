const faker = require('faker');
const BaseFactory = require('./base.factory');

class UserFactory extends BaseFactory {
  /**
   * Create a user
   *
   * @public
   * @param {Object} attrs of user
   * @returns {Object} a fake user
   */
  generate(attrs) {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'password1',
      ...attrs,
    };
  }
}

module.exports = new UserFactory();
