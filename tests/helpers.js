const supertest = require('supertest');
const { app } = require('../index');

const api = supertest(app);

const postToCheckout = async (items, token, status) => {
    return await api
        .post('/agave/store/api/v1/orders/checkout')
        .set('Authorization', 'Bearer '+token)
        .send({items})
        .expect(status)
        .expect('Content-Type', /application\/json/)
};

const specificTestToCheckout = async (items, token, testName, totalToBe) => {
    return test(testName, async () => {

        const result = await postToCheckout(items, token, 201);
        
        expect(result.body.total).toBe(totalToBe);
    });
}

const login = async (credentials, status) => {
    return await api
        .post('/agave/store/api/v1/auth/login')
        .send(credentials)
        .expect(status)
}

module.exports = {
    api,
    postToCheckout,
    specificTestToCheckout,
    login
}