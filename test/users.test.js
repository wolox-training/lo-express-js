const request = require('supertest');
const app = require('../app');
const { user, repeatedUser, passwordUser, missingPropertyUser } = require('../test/data/users');

describe('POST /users - Signup', () => {
  /*eslint-disable */
  let response;
  let status;
  let lastName;
  /*eslint-disable */

  beforeAll(async () => {
      response = await request(app)
        .post('/users')
        .send(user);

      ({
        body: { lastName },
        status
      } = response);
    
  });

  it('Should return property lastName saved in database', () => {
    expect(lastName).toBe(user.lastName);
  });

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });
});

describe('POST /users - Signup Failed - Repeated User', () => {
  /*eslint-disable */
    let response;
    let status;
    let message;
  /*eslint-disable */
    
      beforeAll(async () => {

        await request(app)
     .post('/users')
     .send(repeatedUser);

      response = await request(app)
      .post('/users')
      .send(repeatedUser);
  
        ({
          body: { message },
          status
        } = response);
      
    });
  
    it('Should fail and display an existing user message', () => {
      expect(message).toBe('Trying to create a user that already exists');
    });
  
    it('Should return status code 409', () => {
      expect(status).toBe(409);
    });
  });

  describe('POST /users - Password restriction', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */

    beforeAll(async () => {
        response = await request(app)
          .post('/users')
          .send(passwordUser);
  
        ({
          body: { message, internal_code },
          status
        } = response);
      
    });
  
    it('Should fail and display a password message', () => {
      expect(message).toBe('Password should have 8 characters minimum and only alphanumeric characters');
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
    });

    it('Should return an internal code error', () => {
      expect(internal_code).toBe('bad_request_error');
    });
  });

  describe('POST /users - Missing attribute', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */
    beforeAll(async () => {
        response = await request(app)
          .post('/users')
          .send(missingPropertyUser);
  
        ({
          body: { message, internal_code },
          status
        } = response);
      
    });
  
    it('Should fail displaying a message', () => {
      expect(message).toBe('There are missing fields');
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
    });

    it('Should return an internal code error', () => {
      expect(internal_code).toBe('bad_request_error');
    });
  });
