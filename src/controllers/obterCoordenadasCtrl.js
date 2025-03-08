const { obterCep } = require('../integrations/viaCepService');
const { obterCoordenadas } = require('../integrations/nominatimService');
const { resgatarLojas} = require('../database/resgatarLojas');
const { calculoDistancia } = require('../teste/calculoHaversine')
const logger = require('../utils/logger');

// -----------------------------------------

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

        const { localidade: cidade, logradouro: rua, bairro: bairro, uf: estado } = dadosEndereco = await obterCep(cep);
        logger.info(`Cep informado pelo usuário: ${cep}`)
        logger.info(`Localização obtida do Cep: Cidade: ${cidade}, Bairro: ${bairro}, Rua: ${rua}, Estado: ${estado}`)

        const { latitude: latUsuario, longitude: lonUsuario } = await obterCoordenadas(dadosEndereco);
        logger.info(`Coordenadas localizadas: Latitude: ${latUsuario}, Longitude: ${lonUsuario}`)

        const lojas = await resgatarLojas();

        const distancias = lojas.map(loja => {
            const { nome, logradouro: rua, bairro, cidade, uf: estado, latitude: latLoja, longitude: lonLoja } = loja;

            const distancia = calculoDistancia(latUsuario, lonUsuario, latLoja, lonLoja);

            return { nome, cidade, bairro, rua, estado, distancia };
        });

        const lojasProximas = distancias.filter(loja => loja.distancia <= 100)
        .sort((a, b) => a.distancia - b.distancia);

        if (lojasProximas.length === 0) {
            logger.warn(`Nenhuma loja encontrada dentro do raio de 100 km para o Cep ${cep}`);
            return res.status(200).json({
                cidade,
                bairro,
                rua,
                estado,
                aviso: "Nenhuma loja encontrada dentro do raio de 100 km.",
            });
        }

        return res.status(200).json({
            cidade,
            bairro,
            rua,
            estado,
            distancias: lojasProximas
            });


    } catch (error) {
        logger.error(`Erro ao processar o Cep ${cep}: ${error.message}`);
        
        if (error.message === "Cep não localizado!" || error.message === "Coordenadas não localizadas!") {
            return res.status(404).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro ao localizar as coordenadas!" });
    }
};

module.exports = { obterCoordenadasCtrl };







