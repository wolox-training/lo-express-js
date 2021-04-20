const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers, signUpAdmin } = require('./controllers/users');
const { createWeet } = require('./controllers/weets');
const { userSchema, signInSchema } = require('./schemas/users');
const {
  checkExistingEmail,
  verifyAuthentication,
  verifyAdmin,
  idVerify
} = require('./middlewares/validators/users');
const { validateBySchema } = require('./middlewares/validators/schemaValidators');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/users', [verifyAuthentication], getUsers);
  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
  app.post('/users/sessions', [validateBySchema(signInSchema)], signIn);

  app.post('/admin/users', [validateBySchema(userSchema), verifyAuthentication, verifyAdmin], signUpAdmin);

  app.post('/weets', [verifyAuthentication, idVerify], createWeet);
};
