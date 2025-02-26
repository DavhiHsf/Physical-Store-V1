const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port} 🔥`);
  console.log(`Data da inicialização: ${new Date().toLocaleString()}`);
});

