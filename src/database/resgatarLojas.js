const db = require('../database/db');

const resgatarLojas = () => {
    return new Promise((resolve, reject) => {

        db.all(`SELECT nome, logradouro, bairro, cidade, uf, latitude, longitude FROM lojas`, [], (err, rows) => {
            if (err) {
                return reject(err);

                // logger.error("Erro ao obter dados de latitude e longitude:", err.message);
                // return res.status(500).json({ error: "Erro ao obter coordenadas das lojas!" });
            }

            resolve(rows);
        });
    });
};

module.exports = { resgatarLojas }; 