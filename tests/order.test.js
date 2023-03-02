const { api,
        postToCheckout,
        specificTestToCheckout,
        login } = require('./helpers');
const { server } = require('../index');
const config = require('../config');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbCI6MiwiaWF0IjoxNjc3NzM1NDU1fQ.73d0qqlvU5Qzq7NuIPfyZyHKkfKhGdYf93gzWm4ny4k'; 

describe('checkout behavior', () => {
    test('providing valid items', async () => {
        const items = ['PANTS', 'TSHIRT', 'HAT'];
        

        const result = await postToCheckout(items, token, 201);
        
        expect(result.body).toHaveProperty('total');
        expect(result.body.total).toMatch(/\$[0-9]+\.[0-9]{2}/);
        expect(result.body).toHaveProperty('message', 'total returned');
    });

    test('providing void array', async () => {

        await postToCheckout({}, token, 400);
    });

    test('not providing authorization token', async () => {
        const items = ['PANTS', 'TSHIRT', 'HAT'];

        await api
            .post('/agave/store/api/v1/orders/checkout')
            .send({items})
            .expect(401)
    });

    test('providing non-valid authorization token', async () => {
        const items = ['PANTS', 'TSHIRT', 'HAT'];

        await api
            .post('/agave/store/api/v1/orders/checkout')
            .set('Authorization', 'Bearer abc')
            .send({items})
            .expect(401)

    });

});

describe('login results', () => {
    test('valid credentials', async () => {
        const credentials = { email: "user@mail.com", password: config.suPassword };
        
        const result = await login(credentials, 200)

        expect(result.body).toHaveProperty('token');
        expect(result.body).toHaveProperty('user');
    });

    test('void body', async () => {
        await login({}, 400);
    });

    test('different parameters', async () => {
        const credentials = { username: "user@mail.com", passphrase: config.suPassword };

        await login(credentials, 400);
    });

    test('non-existent user', async () => {
        const credentials = { email: "myuser@mail.com", password: config.suPassword };

        await login(credentials, 404);
    });

    test('wrong password', async () => {
        const credentials = { email: "user@mail.com", password: "example" };

        await login(credentials, 401);
    });

});

//Created only with the purpose of testing corner cases provided by examples. Not scalable nor data agnostic
//In case of project scaling or changes on provided data, these ones would be deleted
describe('provided checkout examples', () => {

    const oneOfEach = async () => {
        const items = ['PANTS', 'TSHIRT', 'HAT'];
        await specificTestToCheckout(items, token, 'one of each', '$32.50');
    } 
    
    const twoForOne = async () => {
        const items = ['PANTS', 'TSHIRT', 'PANTS'];
        await specificTestToCheckout(items, token, '2-for-1 pants', '$25.00');
    }

    const bulk = async () => {
        const items = ['TSHIRT', 'TSHIRT', 'TSHIRT', 'PANTS', 'TSHIRT'];
        await specificTestToCheckout(items, token, 'bulk t-shirts', '$81.00');
    }

    const bothDiscounts = async () => {
        const items = ["PANTS", "TSHIRT", "PANTS", "PANTS", "HAT", "TSHIRT", "TSHIRT"];
        await specificTestToCheckout(items, token, 'bulk t-shirts', '$74.50');
    }


    oneOfEach();
    twoForOne();
    bulk();
    bothDiscounts();

});

afterAll(() => {
    server.close();
});