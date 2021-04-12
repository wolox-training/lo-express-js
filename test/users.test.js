const request = require('supertest');
const app = require('../app');
const {
  user,
  repeatedUser,
  passwordUser,
  missingPropertyUser,
  signUpUser,
  wrongDomainUser
} = require('../test/data/users');

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
      expect(message.password.msg).toBe('Password should be at least 8 characters');
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
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
      expect(message.firstName.msg).toBe('firstName is required');
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
    });

    it('Should return an internal code error', () => {
      expect(internal_code).toBe('schema_error');
    });
  });

  describe('POST /users/sessions - Sign In', () => {
    /*eslint-disable */
    let response;
    let status;
    /*eslint-disable */

    beforeAll(async () => {
      await request(app)
        .post('/users')
        .send(signUpUser);

        response = await request(app)
          .post('/users/sessions')
          .send({email: signUpUser.email, password: signUpUser.password});
  
        ({
          body: { email },
          status
        } = response);
      
    });
  
    it('Should display the email of the user', () => {
      expect(email).toBe(signUpUser.email);
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(200);
    });

    it('Should return an internal code error', () => {
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /users/sessions - Sign In - Email Restriction', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */

    beforeAll(async () => {
      await request(app)
        .post('/users')
        .send(wrongDomainUser);

        response = await request(app)
          .post('/users/sessions')
          .send({email: wrongDomainUser.email, password: wrongDomainUser.password});
  
        ({
          body: { message, internal_code },
          status
        } = response);
      
    });
  
    it('Should display an error message', () => {
      expect(message.email.msg).toBe('email not part of Wolox');
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
    });

    it('Should have a message property', () => {
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /users/sessions - Sign In - Password match', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */

    beforeAll(async () => {
      await request(app)
        .post('/users')
        .send(signUpUser);

        response = await request(app)
          .post('/users/sessions')
          .send({email: signUpUser.email, password: repeatedUser.password});
  
        ({
          body: { message, internal_code },
          status
        } = response);
      
    });
  
    it('Should display an error message', () => {
      expect(message).toBe('Wrong user or password');
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
    });

    it('Should return an internal code error', () => {
      expect(response.body).toHaveProperty('message');
    });
  });
