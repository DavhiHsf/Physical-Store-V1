const db = require('../database/db');

// ----------------------------------------------------------------

const inserirLojas = (req, res) => {
    const { nome, descricao, logradouro, bairro, cidade, uf, telefone, cep } = req.body;

    if (!nome || !descricao || !logradouro || !bairro || !cidade || !uf || !telefone || !cep) {
        return res.status(400).json({ error: "É necessário o preenchimento de todos os campos!" });
    }

    const query = `INSERT INTO lojas (nome, descricao, logradouro, bairro, cidade, uf, telefone, cep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [nome, descricao, logradouro, bairro, cidade, uf, telefone, cep], function (err) {
        if (err) {
            return res.status(500).json({ error: "Erro ao inserir loja.", details: err.message });
        }
        res.status(201).json({ message: "Loja inserida com sucesso!", lojaId: this.lastID });
    });
};

module.exports = { inserirLojas };