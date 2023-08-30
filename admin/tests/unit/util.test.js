const util = require('../util');

describe('get token', () => {
    it('should return no token if wrong login info', async () => {
        const getToken = await util.getToken('haroon@gmail.com', 'password321s');

        expect(getToken.body).not.toHaveProperty('token');
    });

    it('should return token if correct login info', async () => {
        const getToken = await util.getToken('haroon@gmail.com', 'password321');

        expect(getToken.body).toHaveProperty('token');
    });
});