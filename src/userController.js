const { ObjectId } = require('mongodb');
const { getDb } = require('../db/db.js');

// Cria um novo usuário
async function createUser(req, res) {
  try {
    const user = req.body;
    const db = getDb();
    const collection = db.collection('users');
    
    const result = await collection.insertOne(user);
    res.status(201).send(`Usuário adicionado com ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).send('Erro interno ao criar usuário');
  }
}

// Lista todos os usuários
async function getAllUsers(req, res) {
  try {
    const db = getDb();
    const collection = db.collection('users');
    
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send('Erro interno ao buscar usuários');
  }
}

// Obtém um usuário por ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const db = getDb();
    const collection = db.collection('users');
    
    const user = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    
    res.json(user);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).send('Erro interno ao buscar usuário');
  }
}

// Atualiza um usuário
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const db = getDb();
    const collection = db.collection('users');
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    
    res.send(`Usuário com ID ${id} atualizado com sucesso`);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).send('Erro interno ao atualizar usuário');
  }
}

// Remove um usuário
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const db = getDb();
    const collection = db.collection('users');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    
    res.send(`Usuário com ID ${id} removido com sucesso`);
  } catch (err) {
    console.error('Erro ao remover usuário:', err);
    res.status(500).send('Erro interno ao remover usuário');
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};