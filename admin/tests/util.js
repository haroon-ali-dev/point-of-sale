const request = require('supertest');
const baseUrl = 'http://localhost:3000';

async function getToken() {
    const response = await request(baseUrl)
        .post('/api/login')
        .send({ email: 'haroon@gmail.com', password: 'password321' });
    
    return response.body.token;
}

module.exports.getToken = getToken;