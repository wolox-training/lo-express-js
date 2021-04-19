const request = require('supertest');
const app = require('../app');
const { signUpUser, pagination, badPagePagination, badLimitPagination } = require('./data/weets');

describe('GET /weets - Return All weets created', () => {
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

        await request(app)
          .post('/weets')
          .set('Authorization', token);

          await request(app)
          .post('/weets')
          .set('Authorization', token);

        response = await request(app)
          .get('/weets')
          .set('Authorization', token)
          .query({page: pagination.page,limit: pagination.limit});
  
        ({
          body,
          status
        } = response);
      
    });
  
    it('Should return only one item', () => {
      expect(body.length).toBe(2);
    });
  
    it('Should return status code 200', () => {
      expect(status).toBe(200);
    });
  });

    describe('GET /weets - Unauthorized User', () => {
      /*eslint-disable */
      let response;
      let status;
      let message;

      /*eslint-disable */
  
      beforeAll(async () => {
  
        response = await request(app)
        .get('/weets')
        .query({page: pagination.page,limit: pagination.limit});
    
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

  describe('GET /weets - Bad page pagination', () => {
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
  
          await request(app)
            .post('/weets')
            .set('Authorization', token);
  
          response = await request(app)
            .get('/weets')
            .set('Authorization', token)
            .query({page: badPagePagination.page,limit: badPagePagination.limit});
    
            ({
                body: { message, internal_code },
                status
              } = response);
          
        });
      
        it('Should display an error message', () => {
          expect(message).toBe('Minimum page has to be between 1 and 25');
        });
      
        it('Should return status code 422', () => {
          expect(status).toBe(422);
        });
    
        it('Should return an internal code error', () => {
          expect(response.body).toHaveProperty('message');
        });
  
        it('Should return the login_error internal code', () => {
          expect(internal_code).toBe('schema_error');
        });
        
      });

      describe('GET /weets - Limit page pagination', () => {
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
      
              await request(app)
                .post('/weets')
                .set('Authorization', token);
      
              response = await request(app)
                .get('/weets')
                .set('Authorization', token)
                .query({page: badLimitPagination.page,limit: badLimitPagination.limit});
        
                ({
                    body: { message, internal_code },
                    status
                  } = response);
              
            });
          
            it('Should display an error message', () => {
              expect(message).toBe('Minimum limit has to be between 1 and 100');
            });
          
            it('Should return status code 422', () => {
              expect(status).toBe(422);
            });
        
            it('Should return an internal code error', () => {
              expect(response.body).toHaveProperty('message');
            });
      
            it('Should return the login_error internal code', () => {
              expect(internal_code).toBe('schema_error');
            });
            
          });