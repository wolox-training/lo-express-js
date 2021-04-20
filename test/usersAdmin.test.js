const request = require('supertest');
const app = require('../app');
const { createAdmin } = require('../app/services/users');
const { adminUser, repeatedUser, passwordUser, missingPropertyUser } = require('../test/data/users');
const { formatUserInput } = require('../app/mappers/users');
const helpers = require('../app/helpers/users');

describe('POST /admin/users - Signup a new Admin', () => {
  /*eslint-disable */
  let response;
  let status;
  let last_name;
  let signedInUser;
  let password;
  let payload;
  /*eslint-disable */

  beforeAll(async () => {
        ({password} = adminUser);
        adminUser.password = await helpers.encryptPayload(password);
         created = await createAdmin(formatUserInput(adminUser)); 

         signedInUser = await request(app)
          .post('/users/sessions')
          .send({email: adminUser.email, password: password});

          payload = JSON.parse(signedInUser.text);
            
          response = await request(app)
          .post('/admin/users')
          .set('Authorization', payload.token)
          .send(repeatedUser);

      ({
        body: { last_name },
        status
      } = response);
    
  });

  it('Should return property lastName saved in database', () => {
    expect(last_name).toBe(repeatedUser.last_name);
  });

  it('Should return status code 201', () => {
    expect(status).toBe(201);
  });
});

  describe('POST /admin/users - Password restriction', () => {
    /*eslint-disable */
    let response;
    let status;
    let message;
    /*eslint-disable */

    beforeAll(async () => {
            
          response = await request(app)
          .post('/admin/users')
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

  describe('POST /admin/users - Missing attribute', () => {
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