/* eslint-disable no-undef */
const request = require('supertest');
const { server, appServer } = require('../../../index');

describe('Admin endpoints', () => {
  const generateURL = endpoint => `/auth/admin/${endpoint}`;
  describe('Create Admin endpoints', () => {
    test('should fail with empty request body', async () => {
      const res = await request(server)
        .post(generateURL('register'))
        .send();

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});

afterAll(() => appServer.close());
