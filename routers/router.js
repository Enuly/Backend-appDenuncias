const express = require("express");
const router = express.Router();
const db = require("../db/conectdb.js");

//rota principal
router.get("/", (req, res) => {
  res.status(200).json({ message: "servidor iniciado com json" });
});
//rota cadastro
router.post("/createUser", async (req, res) => {
  const { nome, Email, CPF, Senha, CEP, Endereco } = req.body;
  if (
    (nome == "" || Senha == "" || CPF == "",
    CEP == "" || Endereco == "" || Email == "")
  ) {
    res
      .status(422)
      .json({ message: "preencha todos os seus dados! fi de corno" });
  } else if (!nome || !CPF || !Senha || !Endereco || !CEP || !Email) {
    res
      .status(422)
      .json({ message: "preencha todos os seus dados! fi de corno" });
  } else {
    await db.query(
      "insert into usuario(nome, senha, cpf, cep, endereco, email) values('" +
        nome +
        "','" +
        Senha +
        "'," +
        CPF +
        "," +
        CEP +
        ",'" +
        Endereco +
        "','" +
        Email +
        "');"
    );
    res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
  }
});
//login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha || email == "" || senha == "") {
    res.status(422).json({ message: "Digite todas as credênciais!" });
  } else {
    const result = await db.query(
      "select * from usuario where usuario.email = '" +
        email +
        "' and usuario.senha = '" +
        senha +
        "'"
    );
    if (result[0].length == 0) {
      res.status(422).json({
        message: "Usuário  não encontrado!",
        data: 0,
      });
    } else {
      res.status(200).json({
        message: "ok!",
        data: result[0][0],
      });
    }
  }
});

module.exports = router;