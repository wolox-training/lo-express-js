const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers, signUpAdmin, invalidateAll } = require('./controllers/users');
const { createWeet, getWeets } = require('./controllers/weets');
const { userSchema, signInSchema, getUsersSchema } = require('./schemas/users');
const { getAllWeetsSchema } = require('./schemas/weets');
const { checkExistingEmail, verifyAuthentication, verifyAdmin } = require('./middlewares/validators/users');
const { validateBySchema } = require('./middlewares/validators/schemaValidators');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/users', verifyAuthentication, [validateBySchema(getUsersSchema)], getUsers);
  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
  app.post('/users/sessions', [validateBySchema(signInSchema)], signIn);
  app.post('/users/sessions/invalidate_all', verifyAuthentication, invalidateAll);

  app.post('/admin/users', [validateBySchema(userSchema), verifyAuthentication, verifyAdmin], signUpAdmin);

  app.post('/weets', [verifyAuthentication], createWeet);
  app.get('/weets', [validateBySchema(getAllWeetsSchema), verifyAuthentication], getWeets);
};
