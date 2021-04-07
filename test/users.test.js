const request = require('supertest');
const truncateDatabase = require('./setup');
const app = require('../app');
const { user, repeatedUser } = require('../test/data/users');

beforeAll(async () => {
  await truncateDatabase();
  response = await request(app)
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
    let lastName;
    beforeAll(async () => {
        response = await request(app)
          .post('/users')
          .set('Accept', 'application/json')
          .send(repeatedUser);
  
        ({
          body: { lastName },
          status
        } = response);
      
    });
  
    it('Should signUp a new User successfully', () => {
      expect(lastName).toBe(repeatedUser.lastName);
    });
  
    it('Should return status code 400', () => {
      expect(status).toBe(400);
    });
  });
