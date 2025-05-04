const request = require('supertest');
const { app }  = require('../index');

describe('CreateUser', () => {

    it('should create a user', async () => {
        const user = {
            name:'Nome Teste',
            email: 'teste@email.com',
            password: 'teste1234'
        };

        const response = await request(app).post('/register/').send(user);

        // Valida se retornou 201 -- Gravou com sucesso
        expect(response.status).toBe(201);

        // Validando corpo de resposta do cadastro
        expect(response.body).toHaveProperty('id_user');
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
    });

    it('should return 400 if name is missing', async () => {
        const user = {
            email: 'teste400@email.com',
            password: 'teste1234'
        };

        const response = await request(app).post('/register/').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('messages');

        // Verifica se o response body retornou -> field:'name'
        expect(response.body.messages).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: 'name'
                })
            ])
        )
    });
})