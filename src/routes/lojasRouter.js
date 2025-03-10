const express = require('express');
const { listarLojas, inserirLojas } = require('../controllers/lojasCtrl');
const { consultarLojasPorCep } = require('../controllers/consultarLojasCtrl')

const router = express.Router();

router.get('/listarLojas', listarLojas);
router.post('/inserirLojas', inserirLojas);
router.get('/consultarLojas/:cep', consultarLojasPorCep)

module.exports = router;

