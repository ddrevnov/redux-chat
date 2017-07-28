const faker = require('faker');
const BaseFactory = require('./base.factory');

class PostFactory extends BaseFactory {
  /**
   * Create a post
   *
   * @public
   * @param {Object} attrs of post
   * @returns {Object} a fake post
   */
  generate(attrs) {
    return {
      title: faker.lorem.words(6),
      text: faker.lorem.sentence(),
      ...attrs,
    };
  }
}

module.exports = new PostFactory();
