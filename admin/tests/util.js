const request = require('supertest');
const baseUrl = 'http://localhost:3000';

async function getToken(email, password) {
    const response = await request(baseUrl)
        .post('/api/login')
        .send({ email, password });
    
    return response;
}

module.exports.getToken = getToken;