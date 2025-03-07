const express = require('express');
const router = express.Router();
const { obterCepCtrl } = require('../controllers/obterCepCtrl');

// ----------------------------------------------------------------

router.get('/obterCep/:cep', obterCepCtrl);

module.exports = router;