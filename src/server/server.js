const app = require("./app");

const PORT = 1610;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT} 🔥`);
  console.log(`Data da inicialização: ${new Date().toLocaleString()}`);
});
