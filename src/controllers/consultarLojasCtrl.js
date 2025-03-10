const { obterCep } = require('../integrations/viaCepService');
const { obterCoordenadas } = require('../integrations/mapboxService');
const { resgatarLojas } = require('../database/db');
const { calculoDistancia } = require('../utils/calculoHaversine')
const logger = require('../utils/logger');

// Importações -----------------------------------------------------

const consultarLojasPorCep = async (req, res) => {
    const { cep } = req.params;

    try {
        const cepUsuario = await obterCep(cep)
        logger.info(`Cep informado pelo usuário: ${cep}`)

        const { localidade: cidade, logradouro: rua, bairro, uf } = cepUsuario
        logger.info(`Localização obtida do Cep: Cidade: ${cidade}, Bairro: ${bairro || "Não localizado"}, Rua: ${rua || "Não localizada"}, Estado: ${uf}`)

        const localizacaoCepUsuario = {
            cidade: cidade || "Não localizada",
            bairro: bairro || "Não localizado",
            rua: rua || "Não localizada",
            cep: cep || "Não localizado",
            uf: uf || "Não localizado"
        };

// -----------------------------------------

        const { latitude: latUsuario, longitude: lonUsuario } = await obterCoordenadas(cepUsuario);
        logger.info(`Coordenadas localizadas: Latitude: ${latUsuario}, Longitude: ${lonUsuario}`)

        const lojas = await resgatarLojas();

        const lojasBanco = lojas.map(loja => {
            const { nome, logradouro, bairro, cidade, cep, uf, latitude: latLoja, longitude: lonLoja } = loja;

            const distancia = calculoDistancia(latUsuario, lonUsuario, latLoja, lonLoja);

            return { nome, cidade, bairro, logradouro, cep, uf, distancia, distanciaFormatada: `${distancia} km de distância` };

        });

        const lojasBancoFiltradas = lojasBanco.filter(loja => loja.distancia <= 100)
        .sort((a, b) => a.distancia - b.distancia).map(({ distancia, ...rest }) => rest);
        ;

        if (lojasBancoFiltradas.length === 0) {
            logger.warn(`Nenhuma loja encontrada dentro do raio de 100 km para o Cep ${cep}`);

            return res.status(200).json({
                'Dados do Cep informado': localizacaoCepUsuario,
                aviso: `Nenhuma loja encontrada dentro de um raio de 100 km do Cep ${cep}`,
            });
        }

        return res.status(200).json({
            'Dados do Cep informado': localizacaoCepUsuario,
            'Lojas mais próximas': lojasBancoFiltradas
            });


    } catch (error) {
        logger.error(`Erro ao processar o Cep ${cep}: ${error.message}. Detalhes do erro: ${error.stack}`);
        
        if (error.message === "Cep não localizado!" || error.message === "Coordenadas não localizadas!") {
            return res.status(404).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro ao localizar as coordenadas!" });
    }
};

module.exports = { consultarLojasPorCep };