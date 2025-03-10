const axios = require('axios');
const logger = require('../utils/logger')

// Importações -----------------------------------------------------


const verificarCep = (cep) => {
    if (!/^\d{5}-\d{3}$/.test(cep) && !/^\d{8}$/.test(cep)) {
        logger.warn(`Inserção de Cep inválido: ${cep}. O formato correto é XXXXX-XXX ou XXXXXXXX.`);
        throw new Error("Cep inválido!");
    }
};


const obterCep = async (cep) => {
    try {
        verificarCep(cep);

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.data) {
            logger.warn(`O Cep ${cep} não foi localizado!`);
            throw new Error("CEP não localizado!")
        }

        return response.data;
    
    } catch (error) {
        logger.error(`Erro ao consultar o Cep ${cep}: ${error.message}`);
        throw new Error("Erro ao localizar o Cep!");
    }
}

module.exports = { obterCep };