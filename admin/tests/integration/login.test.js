const request = require('supertest');
const db = require('../../cypress/db');

const baseUrl = 'http://localhost:3000';

describe('/api/login', () => {
    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should respond with 400 if password is missing', async () => {
        const response = await request(baseUrl)
            .post('/api/login')
            .send({ email: 'haroon@gmail.com' });

        expect(response.status).toBe(400);
    });

    it('should respond with 400 if wrong login details', async () => {
        const response = await request(baseUrl)
            .post('/api/login')
            .send({ email: 'haroon@gmail.com', password: 'password3211' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid email or password.');
    });

    it('should respond with 200 with token', async () => {
        const response = await request(baseUrl)
            .post('/api/login')
            .send({ email: 'haroon@gmail.com', password: 'password321' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});