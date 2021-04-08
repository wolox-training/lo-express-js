const request = require('supertest');
const truncateDatabase = require('./setup');
const app = require('../app');
const { user, repeatedUser, passwordUser, missingUser } = require('../test/data/users');

 beforeEach(async() => {
   const response = await request(app)
    .post('/users')
    .set('Accept', 'application/json')
    .send(repeatedUser);
 });

describe('POST /users - Signup', () => {
  let response;
  let status;
  let lastName;
  beforeAll(async () => {
      response = await request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .send(user);

      ({
        body: { lastName },
        status
      } = response);
    
  });

  it('Should signUp a new User successfully', () => {
    expect(lastName).toBe(user.lastName);
  });

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });
});

describe('POST /users - Signup Failed - Repeated User', () => {
    let response;
    let status;
    let message;
      beforeAll(async () => {
      response = await request(app)
      .post('/users')
      .set('Accept', 'application/json')
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
    let response;
    let status;
    let message;
    beforeAll(async () => {
        response = await request(app)
          .post('/users')
          .set('Accept', 'application/json')
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

    it('Should return status code 400', () => {
      expect(internal_code).toBe('bad_request_error');
    });
  });

  describe('POST /users - Missing attribute', () => {
    let response;
    let status;
    let message;
    beforeAll(async () => {
        response = await request(app)
          .post('/users')
          .set('Accept', 'application/json')
          .send(missingUser);
  
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

    it('Should return status code 400', () => {
      expect(internal_code).toBe('bad_request_error');
    });
  });
