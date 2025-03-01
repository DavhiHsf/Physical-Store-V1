const app = require("./app");
const listarLojasRouter = require("../routes/listarLojasRouter");
const inserirLojasRouter = require("../routes/inserirLojasRouter");
const buscarCepRouter = require('../routes/buscarCepRouter');  

// ----------------------------------------------------------------

app.use(listarLojasRouter);
app.use(inserirLojasRouter);
app.use(buscarCepRouter);

const PORT = 1610;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT} 🔥`);
  console.log(`Data da inicialização: ${new Date().toLocaleString()}`);
});
