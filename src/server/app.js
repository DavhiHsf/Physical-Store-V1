const express = require("express");
const lojasRouter = require("../routes/lojasRouter");

const app = express();

app.use(express.json());

app.use(lojasRouter);

app.get("/", (req, res) => {
  res.send("Servidor On! 🪅");
});

module.exports = app;