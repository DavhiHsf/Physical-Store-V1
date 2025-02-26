const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port} 🔥`);
  console.log(`Data da inicialização: ${new Date().toLocaleString()}`);
});

const PORT = process.env.PORT || 1610;

app.use(cors()); app.use(express.json());

app.get("/", (req, res) => {
  res.send("API On!");
});

