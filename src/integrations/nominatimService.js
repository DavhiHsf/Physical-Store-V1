const axios = require("axios");

//------------------------------------------------------------

// async function obterCoordenadasCEP(cep) {
//     const url = `https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json`;
    
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 "User-Agent": "MeuApp/1.0" 
//             }
//         });

//         if (response.data.length === 0) {
//             throw new Error("Nenhuma coordenada encontrada para este CEP.");
//         }

//         const { lat, lon } = response.data[0];

//         return { latitude: parseFloat(lat), longitude: parseFloat(lon) };

//     } catch (error) {
//         console.error("Erro ao obter coordenadas:", error.message);
//         throw new Error("Erro ao obter coordenadas.");
//     }
// }

// module.exports = obterCoordenadasCEP;
