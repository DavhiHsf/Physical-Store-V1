const calculoDistancia = (lat1, lon1, lat2, lon2)  => {
    
    const raioTerra = 6371;

    function toRad(value) {
        result = (value * Math.PI) / 180;
        return result;
    }

    const diferencaLat = toRad(lat2 - lat1);
    const diferencaLon = toRad(lon2 - lon1);

    const a = Math.sin(diferencaLat / 2) * Math.sin(diferencaLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(diferencaLon / 2) * Math.sin(diferencaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = raioTerra * c;
    
    return distancia.toFixed(1);
}

module.exports = { calculoDistancia }