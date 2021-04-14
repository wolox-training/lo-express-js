const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers } = require('./controllers/users');
const { userSchema, signInSchema } = require('./schemas/users');
const { checkExistingEmail, findAndDecryptPassword, verifyToken } = require('./middlewares/validators/users');
const { validateBySchema } = require('./middlewares/validators/schemaValidators');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/users', [verifyToken], getUsers);
  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
  app.post('/users/sessions', [validateBySchema(signInSchema), findAndDecryptPassword], signIn);
};
