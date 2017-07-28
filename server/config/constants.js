const WHITELIST = {
  messages: {
    create: ['text', 'room'],
  },
  rooms: {
    create: ['name', 'creator'],
  },
  users: {
    create: ['email', 'username', 'password'],
  },
};

module.exports = {
  WHITELIST,
};
