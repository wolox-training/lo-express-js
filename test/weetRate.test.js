const request = require('supertest');
const app = require('../app');
const { signUpUser, weetNotExistent } = require('../test/data/weets');

describe('POST /weets/:id/ratings - create rate of a Weet', () => {
  /* eslint-disable init-declarations */
  let response;
  let status;
  let payload;
  let id;
  let signedInUser;
  let createRate;
  let weetId;
  let rating_user_id;
  /* eslint-enable init-declarations */

  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(signUpUser);

    signedInUser = await request(app)
      .post('/users/sessions')
      .send({ email: signUpUser.email, password: signUpUser.password });

    payload = JSON.parse(signedInUser.text);

    response = await request(app)
      .post('/weets')
      .set('Authorization', payload.token);

    ({
      body: { id: weetId }
    } = response);

    createRate = await request(app)
      .post(`/weets/${weetId}/ratings`)
      .set('Authorization', payload.token)
      .send({ score: 1 });

    ({
      body: { id, rating_user_id },
      status
    } = createRate);
  });

  it('Should return rating_user_id #1', () => {
    expect(rating_user_id).toBe(1);
  });

  it('Should return rate ID #1', () => {
    expect(id).toBe(1);
  });

  it('Should return status code 200', () => {
    expect(status).toBe(200);
  });

  it('Should have a rating_user_id property', () => {
    expect(createRate.body).toHaveProperty('rating_user_id');
  });

  it('Should have a score property', () => {
    expect(createRate.body).toHaveProperty('score');
  });
});

describe('POST /weets/:id/ratings - Rate a weet that does not exist', () => {
  /* eslint-disable init-declarations */
  let status;
  let payload;
  let signedInUser;
  let createRate;
  let message;
  let internal_code;
  /* eslint-enable init-declarations */

  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send(signUpUser);

    signedInUser = await request(app)
      .post('/users/sessions')
      .send({ email: signUpUser.email, password: signUpUser.password });

    payload = JSON.parse(signedInUser.text);

    await request(app)
      .post('/weets')
      .set('Authorization', payload.token);

    createRate = await request(app)
      .post(`/weets/${weetNotExistent.weetId}/ratings`)
      .set('Authorization', payload.token)
      .send({ score: 1 });

    ({
      body: { message, internal_code },
      status
    } = createRate);
  });

  it('Should display an error message', () => {
    expect(message).toBe('The weet does not exist');
  });

  it('Should return status code 400', () => {
    expect(status).toBe(400);
  });

  it('Should return an internal code error', () => {
    expect(createRate.body).toHaveProperty('message');
  });

  it('Should return the bad_request_error internal code', () => {
    expect(internal_code).toBe('bad_request_error');
  });
});
