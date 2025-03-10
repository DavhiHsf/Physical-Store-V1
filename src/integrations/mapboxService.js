const axios = require('axios');
const logger = require('../utils/logger');
require('dotenv').config();

// Importações -----------------------------------------------------


const obterCoordenadas = async (endereco) => {
    try {
        const apiKey = process.env.mapboxApiKey

        const { cep, logradouro, bairro, localidade, uf } = endereco;

        const enderecoCompleto =`${logradouro}, ${bairro}, ${localidade}, ${uf}, Brazil`;

        const enderecoCodificado = encodeURIComponent(enderecoCompleto);
        
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${enderecoCodificado}.json`, {
            params: {
                access_token: apiKey,
                language: 'pt',
                limit: 1,
            }
        });

        if (!response.data.features || response.data.features.length === 0) {
            logger.warn(`Coordenadas não localizadas para: Cep ${cep}, ${localidade} - ${uf}. Sem resultados disponíveis`);
            throw new Error("Coordenadas não localizadas!");
        }

        const resultado = {
            latitude: response.data.features[0].geometry.coordinates[1],
            longitude: response.data.features[0].geometry.coordinates[0]
        };

        return resultado;

    } catch (error) {
        logger.error(`Erro ao obter coordenadas para o endereço ${enderecoCompleto}: ${error.message}`);
        throw new Error(error.message || "Erro ao obter coordenadas!");
    }
};

module.exports = { obterCoordenadas };
