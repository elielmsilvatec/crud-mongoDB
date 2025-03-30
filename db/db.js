const { MongoClient } = require('mongodb');

// Configurações de conexão
const uri = "mongodb://localhost:27017";  // String de conexão do MongoDB
const dbName = 'mydb';  // Nome do banco de dados mydb/users
let db;  // Variável para armazenar a conexão

// Função para conectar ao MongoDB
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    db = client.db(dbName);  // Seleciona o banco de dados
    console.log('Conexão com o MongoDB estabelecida com sucesso');
    return db;
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;  // Propaga o erro para quem chamar a função
  }
}

// Função para obter a conexão com o banco
function getDb() {
  if (!db) {
    throw new Error('Banco de dados não conectado');
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDb
};