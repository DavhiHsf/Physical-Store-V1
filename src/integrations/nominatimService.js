const axios = require('axios');
const logger = require('../utils/logger');

const obterCoordenadas = async (endereco) => {
    try {
        const { cep, logradouro, bairro, localidade, uf } = endereco;
        
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                postalcode: cep,
                street: logradouro,
                neighborhood: bairro,
                city: localidade,
                state: uf,
                country: 'Brazil',
                format: 'json',
                limit: 1,
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'MyApp/1.0'
            }
        });

        if (!response.data || response.data.length === 0) {
            logger.warn(`Coordenadas não encontradas para: Cep ${cep}, ${localidade} - ${uf}`);
            throw new Error("Coordenadas não localizadas!");
        }

        const resultado = {
            latitude: response.data[0].lat,
            longitude: response.data[0].lon
        };

        return resultado;

    } catch (error) {
        logger.error(`Erro ao obter coordenadas: ${error.message}`);
        throw new Error(error.message || "Erro ao obter coordenadas");
    }
};

module.exports = { obterCoordenadas };