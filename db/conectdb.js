const Sequelize = require("sequelize");
const db = new Sequelize("registro_queixas_municipais", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});
try {
  db.authenticate();
  console.log("Conectado no banco de dados");
} catch (e) {
  console.log("Não foi possivel conectar ao bd erro: " + e);
}
module.exports = db;
