// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { requestHandler } = require('./helpers/requestHandler');
const { getQuote } = require('./controllers/weets');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', requestHandler(getQuote));
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
