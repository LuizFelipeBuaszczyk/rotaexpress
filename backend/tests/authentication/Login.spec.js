const request = require('supertest');
const {app} = require('../../index');


// Executa uma vez antes de todos os testes desse describe
beforeAll(async () => {

    await request(app).post('/register/').send({
        name: 'Nome Teste',
        email: 'testeLogin@email.com',
        password: 'teste1234'
    });
});


describe('LoginUser', () => {

    it('should not login, password incorret', async () => {
        const user = {
            email: 'testeLogin@email.com',
            password: 'senhaErrada'
        };
     
        const response = await request(app).post('/login').send(user);

        expect(response.status).toBe(401);

    })

    it('should not login, email is not register', async () => {
        const user = {
            email: 'diffemail@email.com',
            password: 'teste1234'
        };
     
        const response = await request(app).post('/login').send(user);

        expect(response.status).toBe(401);
    })

    it('should login', async () => {
        const user = {
            email: 'testeLogin@email.com',
            password: 'teste1234'
        };
     
        const response = await request(app).post('/login').send(user);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        // Verifica se esta retornando os tokens de autenticação
        expect(response.header['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('authToken='),
                expect.stringContaining('refreshToken=')
            ])
        )
    })

})
