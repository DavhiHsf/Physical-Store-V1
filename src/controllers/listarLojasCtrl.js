const db = require('../database/db');

// ----------------------------------------------------------------

const listarLojas = (req, res) => {
    const query = 'SELECT * FROM lojas';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Erro ao listar lojas!:', err.message);
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Nenhuma loja encontrada!" });
        }

        return res.status(200).json(rows);
    });
};

module.exports = { listarLojas };
