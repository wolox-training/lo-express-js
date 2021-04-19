const request = require('supertest');
const app = require('../app');
const { signUpUser, token } = require('../test/data/users');

describe('POST /weets - create Weet', () => {
  /*eslint-disable */
  let response;
  let status;
  let payload;
  let user_id;
  let id;
  let signedInUser;
  /*eslint-disable */

  beforeAll(async () => {
    await request(app)
    .post('/users')
    .send(signUpUser);

    signedInUser = await request(app)
      .post('/users/sessions')
      .send({email: signUpUser.email, password: signUpUser.password});

      payload = JSON.parse(signedInUser.text);

      response = await request(app)
          .post('/weets')
          .set('Authorization', payload.token);

      ({
        body: { user_id, id },
        status
      } = response);
    
  });

  it('Should return userId #1', () => {
    expect(user_id).toBe(1);
  });

  it('Should return weet ID #1', () => {
    expect(id).toBe(1);
  });

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });

  it('Should have a content property', () => {
    expect(response.body).toHaveProperty('content');
  });
});

describe('POST /weets - Unauthorized user', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */
  
    beforeAll(async () => {
  
        response = await request(app)
            .post('/weets')
            .set('Authorization','');
  
        ({
          body: { message, internal_code },
          status
        } = response);
      
    });
  
    it('Should fail displaying a message', () => {
        expect(message).toBe('Unauthorized user');
      });
    
      it('Should return status code 403', () => {
        expect(status).toBe(403);
      });
  
      it('Should return an internal code error', () => {
        expect(internal_code).toBe('login_error');
      });
  });

  describe('POST /weets - invalid token', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */
  
    beforeAll(async () => {
  
        response = await request(app)
            .post('/weets')
            .set('Authorization', token.token)
            .send();
  
        ({
          body: { message, internal_code },
          status
        } = response);
      
    });
  
    it('Should fail displaying a message', () => {
        expect(message).toBe('Token invalid');
      });
    
      it('Should return status code 403', () => {
        expect(status).toBe(403);
      });
  
      it('Should return an internal code error', () => {
        expect(internal_code).toBe('login_error');
      });
  });
  