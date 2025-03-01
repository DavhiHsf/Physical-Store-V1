const axios = require('axios');

const buscarCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
            return { error: "CEP não encontrado!" };
        }

        return response.data;
    
    } catch (error) {
        throw new Error("Erro ao buscar CEP!");
    }
}

module.exports = { buscarCep };