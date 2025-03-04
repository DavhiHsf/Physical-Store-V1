const app = require("./app");
const listarLojasRouter = require("../routes/listarLojasRouter");
const inserirLojasRouter = require("../routes/inserirLojasRouter");
const buscarCepRouter = require('../routes/buscarCepRouter');
const logger = require("../utils/logger");

// ----------------------------------------------------------------

app.use(listarLojasRouter);
app.use(inserirLojasRouter);
app.use(buscarCepRouter);

const PORT = 1610;

app.listen(PORT, () => {
  logger.info(`Rodando na porta ${PORT} 🔥`);
});

app.on('error', (err) => {
  logger.error(`Erro ao iniciar o servidor: ${err.message}`);
});
