const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// ----------------------------------------------------------------

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    } 

    else {
    console.log('Estabelecida a conexão com o Banco de Dados!');
}});

// ----------------------------------------------------------------

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
            cep TEXT NOT NULL
        )`,
        (err) => {
            if (err) {
                console.error("Erro ao criar a tabela lojas:", err.message);
            } 
            
            // else {
            //     console.log("Tabela lojas criada!");
            // }
        }
    );
});

module.exports = db;