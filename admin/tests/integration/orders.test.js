const request = require('supertest');
const db = require('../../cypress/db');
const util = require('../util');

const baseUrl = 'http://localhost:3000';
let token;

describe('/api/orders', () => {
    beforeAll(async () => {
        token = await util.getToken();
    });

    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should get an order', async () => {
        const response = await request(baseUrl)
            .get(`/api/orders/1`)
            .set('x-auth-token', token);

        expect(response.body).toHaveProperty('total', '2.78');
    });
});