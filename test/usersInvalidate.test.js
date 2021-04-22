const request = require('supertest');
const app = require('../app');
const { signUpUser, pagination } = require('./data/users');

describe('POST /users/sessions/invalidate_all - Invalidate token', () => {
  /* eslint-disable init-declarations */
  let response;
  let status;
  let token;
  let message;
  let deleted;
  /* eslint-enable init-declarations */

  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(signUpUser);

    response = await request(app)
      .post('/users/sessions')
      .send({ email: signUpUser.email, password: signUpUser.password });

    ({
      body: { token }
    } = response);

    deleted = await request(app)
      .post('/users/sessions/invalidate_all')
      .set('Authorization', token)
      .send();

    ({
      body: { message },
      status
    } = deleted);
  });

  it('Should display a message', () => {
    expect(message).toBe('All sessions invalidated successfully');
  });

  it('Should return status code 200', () => {
    expect(status).toBe(200);
  });

  it('Should have a message property', () => {
    expect(deleted.body).toHaveProperty('message');
  });
});

describe('POST /users/sessions/invalidate_all - using invalidated token', () => {
  /* eslint-disable init-declarations */
  let response;
  let status;
  let token;
  let message;
  let internal_code;
  let getUsers;
  /* eslint-enable init-declarations */

  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(signUpUser);

    response = await request(app)
      .post('/users/sessions')
      .send({ email: signUpUser.email, password: signUpUser.password });

    ({
      body: { token }
    } = response);

    await request(app)
      .post('/users/sessions/invalidate_all')
      .set('Authorization', token)
      .send();

    getUsers = await request(app)
      .get('/users')
      .set('Authorization', token)
      .query({ page: pagination.page, limit: pagination.limit });

    ({
      body: { message, internal_code },
      status
    } = getUsers);
  });

  it('Should display an error message', () => {
    expect(message).toBe('This token is not valid');
  });

  it('Should return status code 403', () => {
    expect(status).toBe(403);
  });

  it('Should return an internal code error', () => {
    expect(getUsers.body).toHaveProperty('message');
  });

  it('Should return the login_error internal code', () => {
    expect(internal_code).toBe('login_error');
  });
});
