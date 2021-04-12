const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');
const { userSchema } = require('./schemas/users');
const { validateBySchema, checkExistingEmail } = require('./middlewares/validators/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
};
