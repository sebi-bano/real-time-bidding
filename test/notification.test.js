// test/user.test.js
const request = require('supertest');
const { app } = require('../server');
const { sequelize, User } = require('../models');

describe('User Routes', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password', email: 'test@example.com' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'User registered successfully');
  });

  // Additional tests for login, profile, etc.
});
