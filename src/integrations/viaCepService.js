const axios = require('axios');
const logger = require('../utils/logger')


const obterCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.data) {
            logger.warn(`O Cep ${cep} não foi localizado!`);
            return { error: "CEP não localizado!" };
        }

        return response.data;
    
    } catch (error) {
        logger.error(`Erro ao consultar o Cep ${cep}: ${error.message}`);
        throw new Error("Erro ao localizar o Cep!");
    }
}

module.exports = { obterCep };