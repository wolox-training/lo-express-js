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
    expect(lastName).toBe(user.last_name);
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
      expect(message).toBe('Password should be at least 8 characters');
    });
  
    it('Should return status code 422', () => {
      expect(status).toBe(422);
    });

    it('Should return an internal code error', () => {
      expect(internal_code).toBe('schema_error');
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
      expect(message).toBe('firstName is required');
    });
  
    it('Should return status code 422', () => {
      expect(status).toBe(422);
    });

    it('Should return an internal code error', () => {
      expect(internal_code).toBe('schema_error');
    });
  });
