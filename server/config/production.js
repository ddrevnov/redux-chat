module.exports = {
  jwtSecret: process.env.JWT_SECRET_PROD || 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  mongoUrl: process.env.MONGO_URL_PROD || 'mongodb://localhost/redux-chat-prod',
};