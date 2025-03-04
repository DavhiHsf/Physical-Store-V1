const db = require('../database/db');
const logger = require('../utils/logger');

// ----------------------------------------------------------------

const inserirLojas = (req, res) => {
    const { nome, descricao, logradouro, bairro, cidade, uf, telefone, cep, latitude, longitude } = req.body;

    if (!nome || !descricao || !logradouro || !bairro || !cidade || !uf || !telefone || !cep || !latitude || !longitude) {
        logger.warn("Tentativa de inserção de loja com campos faltantes.");
        return res.status(400).json({ error: "É necessário o preenchimento de todos os campos!" });
    }

    const query = `INSERT INTO lojas (nome, descricao, logradouro, bairro, cidade, uf, telefone, cep, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [nome, descricao, logradouro, bairro, cidade, uf, telefone, cep, latitude, longitude], function (err) {
        if (err) {
            logger.error("Erro ao inserir loja:", err.message);
            return res.status(500).json({ error: "Erro ao inserir loja.", details: err.message });
        }

        logger.info(`Loja inserida com sucesso! Nome: ${nome}, ID: ${this.lastID}`);
        res.status(201).json({ message: "Loja inserida com sucesso!", lojaId: this.lastID });
        }
    );
};

module.exports = { inserirLojas };