const request = require('supertest');
const db = require('../../cypress/db');
const util = require('../util');

const baseUrl = 'http://localhost:3000';
let token;

describe('/api/products', () => {
    beforeAll(async () => {
        const getToken = await util.getToken('haroon@gmail.com', 'password321');
        token = getToken.body.token;
    });

    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should get a product', async () => {
        const response = await request(baseUrl)
            .get(`/api/products/1`)
            .set('x-auth-token', token);

        expect(response.status).toBe(200);
    });

    it('should update a product', async () => {
        const response = await request(baseUrl)
            .patch(`/api/products/1`)
            .set('x-auth-token', token)
            .send({ uId: 1, name: 'Bag', price: 1.25, quantity: 5 });

        expect(response.status).toBe(200);
    });

    it('should delete a product', async () => {
        const response = await request(baseUrl)
            .delete(`/api/products/1`)
            .set('x-auth-token', token);

        expect(response.status).toBe(200);
    });
});