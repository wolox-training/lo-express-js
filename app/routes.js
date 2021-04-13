const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');
const { userSchema } = require('./schemas/users');
const { checkExistingEmail } = require('./middlewares/validators/users');
const { validateBySchema } = require('./middlewares/validators/schemaValidators');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
};
