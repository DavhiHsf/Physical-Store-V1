const {buscarCep} = require('../integrations/viaCepService');

const buscarCepCtrl = async (req, res) => {
    const { cep } = req.params;

    if (!cep) {
        return res.status(400).json({ error: "CEP não informado!" });
    }

    if (!/^\d{5}-\d{3}$/.test(cep) && !/^\d{8}$/.test(cep)) {
        return res.status(400).json({ error: "CEP inválido!" });
    }

    try {
        const dadosCep = await buscarCep(cep);
        return res.status(200).json(dadosCep);

        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    };  

module.exports = { buscarCepCtrl };