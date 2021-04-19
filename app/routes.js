const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers, signUpAdmin } = require('./controllers/users');
const { createWeet, getWeets } = require('./controllers/weets');
const { userSchema, signInSchema } = require('./schemas/users');
const { getAllWeetsSchema } = require('./schemas/weets');
const { checkExistingEmail, verifyToken, verifyAdmin, idVerify } = require('./middlewares/validators/users');
const { validateBySchema } = require('./middlewares/validators/schemaValidators');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/users', [verifyToken], getUsers);
  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
  app.post('/users/sessions', [validateBySchema(signInSchema)], signIn);

  app.post('/admin/users', [validateBySchema(userSchema), verifyToken, verifyAdmin], signUpAdmin);

  app.post('/weets', [verifyToken, idVerify], createWeet);
  app.get('/weets', [validateBySchema(getAllWeetsSchema), verifyToken], getWeets);
};
