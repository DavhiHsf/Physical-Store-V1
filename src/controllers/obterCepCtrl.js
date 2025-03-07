const { obterCep } = require('../integrations/viaCepService');
const logger = require('../utils/logger');


const obterCepCtrl = async (req, res) => {
    const { cep } = req.params;

    if (!cep) {
        logger.warn("Tentativa de localização sem Cep informado!");
        return res.status(400).json({ error: "CEP não informado!" });
    }

    if (!/^\d{5}-\d{3}$/.test(cep) && !/^\d{8}$/.test(cep)) {
        logger.warn(`Tentativa de busca de Cep inválido: ${cep}`);
        return res.status(400).json({ error: "Cep inválido!" });
    }

    try {
        const dadosCep = await obterCep(cep);

        if (dadosCep.error || !dadosCep.cep) {
            logger.error(`CEP ${cep} não encontrado!`);
            return res.status(404).json({ error: "CEP não encontrado!" });
        } 

        logger.info(`CEP ${cep} encontrado com sucesso!`);
        return res.status(200).json(dadosCep);

    } catch (error) {
        logger.error(`Erro ao buscar CEP ${cep}: ${error.message}`);
        return res.status(404).json({ error: error.message });
    }
};  

module.exports = { obterCepCtrl };