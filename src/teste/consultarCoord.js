// const axios = require('axios');

// const getCoordinates = async (address) => {
//   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
//   try {
//     const response = await axios.get(url);
//     const data = response.data;
//     if (data && data.length > 0) {
//       const lat = data[0].lat;
//       const lon = data[0].lon;
//       console.log(`Coordenadas de ${address}: Latitude = ${lat}, Longitude = ${lon}`);
//     } else {
//       console.log('Endereço não encontrado.');
//     }
//   } catch (error) {
//     console.error('Erro ao obter coordenadas:', error);
//   }
// };

// getCoordinates('São Paulo');