const express = require('express');
const { connectToDatabase } = require('./db/db');
const userController = require('./src/userController');

// Cria a aplicação Express
const app = express();
app.use(express.json());  // Habilita o parsing de JSON

// Conecta ao banco de dados antes de iniciar o servidor
connectToDatabase()
  .then(() => {
    console.log('Banco de dados conectado - iniciando servidor...');
    
    // Configura as rotas
    app.get('/', (req, res) => {
      res.send('Bem-vindo à API de CRUD com Node.js e MongoDB!');
    });
    // Rotas de usuário
    app.post('/users', userController.createUser);
    app.get('/users', userController.getAllUsers);
    app.get('/users/:id', userController.getUserById);
    app.put('/users/:id', userController.updateUser);
    app.delete('/users/:id', userController.deleteUser);

    // Inicia o servidor
    const port = 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Falha ao iniciar o servidor:', err);
    process.exit(1);  // Encerra o processo com erro
  });