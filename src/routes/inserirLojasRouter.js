const express = require('express');
const router = express.Router();
const { inserirLojas } = require('../controllers/inserirLojasCtrl');

// ----------------------------------------------------------------

router.post('/lojas', inserirLojas);

module.exports = router;

