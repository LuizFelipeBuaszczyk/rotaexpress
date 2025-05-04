const { app }  = require('../index');
const sequelize = require('../bd/db');

let server;

beforeAll(async () => {
    await sequelize.authenticate();
    server = app.listen(process.env.PORT || 3001); // Inicia o servidor
});

// Fechando as conexões
afterAll(async () => {
    if (server){
        server.close();
    }
    await sequelize.close();
})