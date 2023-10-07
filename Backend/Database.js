const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para fazer o parse do corpo das solicitações como JSON
app.use(bodyParser.json());

// Abrir ou criar o banco de dados
const db = new sqlite3.Database('incendios.db');

// Criar tabela de incêndios
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS incendios (id INTEGER PRIMARY KEY, localizacao TEXT, data DATE, causa TEXT)');
});

// Rota para inserir um novo registro de incêndio
app.post('/incendios', (req, res) => {
  const { localizacao, data, causa } = req.body;
  const stmt = db.prepare('INSERT INTO incendios (localizacao, data, causa) VALUES (?, ?, ?)');
  stmt.run(localizacao, data, causa, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de incêndio inserido com sucesso.' });
  });
  stmt.finalize();
});

// Rota para listar todos os registros de incêndio
app.get('/incendios', (req, res) => {
  db.all('SELECT * FROM incendios', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ incendios: rows });
  });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});