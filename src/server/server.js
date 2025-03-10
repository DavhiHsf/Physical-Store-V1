const app = require("./app");
const logger = require("../utils/logger");

const PORT = 1610;

app.listen(PORT, () => {
  logger.info(`Aplicação rodando na porta ${PORT}.`);
});

app.on('error', (err) => {
  logger.error(`Erro ao iniciar o servidor: ${err.message}`);
});
