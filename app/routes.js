const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');
const { userSchema, signInSchema } = require('./schemas/users');
const {
  validateBySchema,
  checkExistingEmail,
  findAndDecryptPassword
} = require('./middlewares/validators/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [validateBySchema(userSchema), checkExistingEmail], signUp);
  app.post('/users/sessions', [validateBySchema(signInSchema), findAndDecryptPassword], signIn);
};
