const express = require("express");
const cors = require("cors");
const sequelize = require("./bd/db");
const routes = require("./routes/routes");
const errorHandler = require("./utils/error.handler");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use(errorHandler);

// Sincronizar com o banco de dados
sequelize.sync({ force: false });

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao PostgreSQL com sucesso!"))
  .catch((err) => console.error("Erro ao conectar:", err));

// Verifica se foi iniciado com o comando node index 
if(require.main === module){
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = app;