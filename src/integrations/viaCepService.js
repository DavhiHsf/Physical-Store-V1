const axios = require('axios');

// Importações ----------------------------------------------------------------

const obterCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.data) {
            return { error: "CEP não encontrado!" };
        }

        return response.data;
    
    } catch (error) {
        throw new Error("Erro ao buscar CEP!");
    }
}

module.exports = { obterCep };