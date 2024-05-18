//importa bibliotecas e modulos
const Express = require("express");
const app = Express();
const routers = require("./routers/router.js");
const bodyparser = require("body-parser");

//define o formato de resposta e requisição de dados
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); 
//usa o arquivos das rotas
app.use(routers);
//inicia o server na porta 5000
//vamos pegar dados do cliente, baixa a extensão thunder cliente no seu vs code
app.listen(5000, () => {
  console.log("Server rodando");
});
