const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const logger = require('../utils/logger');

// ----------------------------------------------------------------

const dbPath = path.resolve(__dirname, 'dbLojas.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados:', err.message);
    } 

    else {
    logger.info('Estabelecida a conexão com o Banco de Dados!');
    }
});

db.serialize(() => {

    db.run(
        `CREATE TABLE IF NOT EXISTS lojas ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT NOT NULL,
            logradouro TEXT NOT NULL,
            bairro TEXT NOT NULL,
            cidade TEXT NOT NULL,
            uf TEXT NOT NULL,
            telefone TEXT NOT NULL,
            cep TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        )`,
        (err) => {
            if (err) {
                logger.error("Erro ao criar a tabela Lojas:", err.message);
            } 
            // else {
            //     logger.info("Tabela Lojas criada!");
            // }
        }
    );
});

module.exports = db;