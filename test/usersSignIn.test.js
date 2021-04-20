const request = require('supertest');
const app = require('../app');
const { repeatedUser, signUpUser, wrongDomainUser, pagination } = require('./data/users');

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
  
    it('Should return status code 200', () => {
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
      expect(message).toBe('email not part of Wolox');
    });
  
    it('Should return status code 422', () => {
      expect(status).toBe(422);
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

  describe('GET /users - Return All Users', () => {
    /*eslint-disable */
    let response;
    let status;
    let signedInUser;
    let token;
    /*eslint-disable */

    beforeAll(async () => {
      await request(app)
      .post('/users')
      .send(signUpUser);

      signedInUser = await request(app)
        .post('/users/sessions')
        .send({email: signUpUser.email, password: signUpUser.password});

        ({
          body: { token },
        } = signedInUser);

        response = await request(app)
          .get('/users')
          .set('Authorization', token)
          .query({page: pagination.page,limit: pagination.limit});
  
        ({
          body,
          status
        } = response);
      
    });
  
    it('Should return only one item', () => {
      expect(body.length).toBe(1);
    });
  
    it('Should return status code 200', () => {
      expect(status).toBe(200);
    });
  });

    describe('GET /users - Unauthorized User', () => {
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
            .get('/users')
            .send({pagination});
    
            ({
              body: { message, internal_code },
              status
            } = response);
        
      });
    
      it('Should display an error message', () => {
        expect(message).toBe('Unauthorized user');
      });
    
      it('Should return status code 403', () => {
        expect(status).toBe(403);
      });
  
      it('Should return an internal code error', () => {
        expect(response.body).toHaveProperty('message');
      });

      it('Should return the login_error internal code', () => {
        expect(internal_code).toBe('login_error');
      });
  });