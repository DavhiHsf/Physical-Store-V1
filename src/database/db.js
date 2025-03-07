const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const logger = require('../utils/logger');

const dbPath = path.resolve(__dirname, 'dbLojas.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
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
    )
});

// const resgatarLojas = async () => {
//     return new Promise((resolve, reject) => {

//         const dbPath = path.resolve(__dirname, 'dbLojas.sqlite');

//         const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
//             if (err) {
//                 logger.error('Erro ao conectar ao banco de dados:', err.message);
//                 return reject(err);
//             }
//         });

//         const query = "SELECT id, nome, latitude, lobgitude";

//         db.all(query, [], (err, rows) => {
//             if (err) {
//                 logger.error(`Erro ao buscar lojas no banco de dados: ${err.message}`)
//             return reject(err);
//         }

//             if (rows.length === 0) {
//                 logger.warn("Nenhuma loja encontrada!")
//             } else {
//                 logger.info("Lojas encontradas!")
//             }

//             resolve(rows);
    
//         });


//     db.close((err) => {
//         if (err) {
//             logger.error(`Erro ao fechar a conexão com o banco de dados: ${err.message}`);
//             } 
//         });
//     });
// };


module.exports = db;
// module.exports = { resgatarLojas }