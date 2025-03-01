const express = require('express');
const router = express.Router();
const { listarLojas } = require('../controllers/listarLojasCtrl');

// ----------------------------------------------------------------

router.get('/lojas', listarLojas);

module.exports = router;

