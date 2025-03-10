const { db } = require('../database/db');
const logger = require('../utils/logger');

// Importações -----------------------------------------------------

const listarLojas = (req, res) => {
    const query = 'SELECT * FROM lojas';

    db.all(query, (err, rows) => {
        if (err) {
            logger.error(`Erro ao listar as lojas do banco de dados!: ${err.message}`);
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }

        if (rows.length === 0) {
            logger.warn('Tentativa de listagem de lojas: nenhuma loja encontrada no banco de dados!');
            return res.status(404).json({ error: "Nenhuma loja encontrada no banco de dados!" });
        }

        logger.info(`Listagem de lojas realizada com sucesso! Núnero de lojas no banco: ${rows.length}`);
        return res.status(200).json(rows);
    });
};

// -------------------------------------------------------------------

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
            logger.error(`Erro ao inserir loja ${nome}: ${err.message}`);
            return res.status(500).json({ error: "Erro ao inserir loja." });
        }

        logger.info(`Loja inserida com sucesso! Nome: ${nome}, ID: ${this.lastID}`);
        res.status(201).json({ message: "Loja inserida com sucesso!", lojaId: this.lastID });
        }
    );
};

module.exports = { listarLojas, inserirLojas };