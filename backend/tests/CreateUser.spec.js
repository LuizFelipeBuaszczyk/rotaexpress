const request = require('supertest');
const app = require('../index');

describe('CreateUser', () => {

    it('should create a user', async () => {
        const user = {
            name:'Nome Teste',
            email: 'teste@email.com',
            password: 'teste1234'
        };

        response = await request(app).post('/register/').send(user);

        console.log(response.body);
    })
})