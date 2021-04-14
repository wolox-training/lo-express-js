const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');
const { userSchema, signInSchema } = require('./schemas/users');
const { checkExistingEmail, findAndDecryptPassword } = require('./middlewares/validators/users');
const { validateBySchema } = require('./middlewares/validators/schemaValidators');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
  app.post('/users/sessions', [validateBySchema(signInSchema), findAndDecryptPassword], signIn);
};
