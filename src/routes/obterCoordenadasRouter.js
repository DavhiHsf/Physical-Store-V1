const express = require('express');
const router = express.Router();
const { obterCoordenadasCtrl } = require('../controllers/obterCoordenadasCtrl');

// ----------------------------------------------------------------

router.get('/obterCoordenadas/:cep', obterCoordenadasCtrl);

module.exports = router;