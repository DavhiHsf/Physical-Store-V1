const { obterCep } = require('../integrations/viaCepService');
const { obterCoordenadas } = require('../integrations/nominatimService');
const logger = require('../utils/logger');

const obterCoordenadasCtrl = async (req, res) => {
    const { cep } = req.params;

    if (!cep) {
        logger.warn("Tentativa de localização sem informar o CEP!");
        return res.status(400).json({ error: "CEP não informado!" });
    }

    if (!/^\d{5}-\d{3}$/.test(cep) && !/^\d{8}$/.test(cep)) {
        logger.warn(`Inserção de CEP inválido: ${cep}`);
        return res.status(400).json({ error: "CEP inválido!" });
    }

    try {
        const dadosEndereco = await obterCep(cep);
        // logger.info(`Dados do endereço: ${JSON.stringify(dadosEndereco)}`);
        
        const { localidade: cidade, uf: estado } = dadosEndereco;
        
        logger.info(`Cep ${cep} pertencente a: ${cidade}, ${estado}`);
        
        const { latitude, longitude } = await obterCoordenadas(dadosEndereco);
        
        return res.status(200).json({ 
            cidade, 
            estado, 
            latitude, longitude 
        });

    } catch (error) {
        logger.error(`Erro ao processar o CEP ${cep}: ${error.message}`);
        
        if (error.message === "CEP não encontrado!" || error.message === "Coordenadas não localizadas!") {
            return res.status(404).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro ao localizar as coordenadas!" });
    }
};

module.exports = { obterCoordenadasCtrl };







