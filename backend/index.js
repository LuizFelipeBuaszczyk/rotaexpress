const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Definir rotas para a API (backend)
app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à API!' });
});

// Qualquer outra rota não correspondente à API deve retornar o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
