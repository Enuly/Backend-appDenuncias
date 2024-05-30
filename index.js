//importa bibliotecas e modulos
const Express = require("express");
const app = Express();
const routers = require("./routers/router.js");
const bodyparser = require("body-parser");
const dotenv = require("dotenv")
const cors = require("cors")

//define o formato de resposta e requisição de dados
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const env = process.env.NODE_ENV || "dev";
dotenv.config({ path: ".env." + env });
const port = process.env.port
//usa o arquivos das rotas
app.use(routers);
//inicia o server na porta 5000
//vamos pegar dados do cliente, baixa a extensão thunder cliente no seu vs code
app.listen(port, () => {
  console.log("Server rodando");
}); 
