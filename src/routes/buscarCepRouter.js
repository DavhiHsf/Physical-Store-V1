const express = require('express');
const router = express.Router();
const { buscarCepCtrl } = require('../controllers/buscarCepCtrl');

// ----------------------------------------------------------------

router.get('/buscarCep/:cep', buscarCepCtrl);

module.exports = router;