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
    const responseCpf = await db.query("select cpf from usuario where usuario.cpf = " + CPF)
    const responseEmail = await db.query("select email from usuario where usuario.email = '" + Email + "'")
   console.log(responseEmail[0].length != 0 )
    if(responseCpf[0].length == [] && responseEmail[0].length == 0 ){
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
      res.status(200).json({cpfIsLogged: false, emailIsLogged: false, created:true, message: "Usuário cadastrado com sucesso!" });
    }else{
      const cpfIsLogged = responseCpf[0][0] != undefined
      const emailIsLogged = responseEmail[0][0] != undefined
      res.status(200).json({ cpfIsLogged: cpfIsLogged, emailIsLogged: emailIsLogged, message: "Cpf cadastrado" });
    }
    
    
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
      res.status(200).json({
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
//search data by cpf
router.post("/getData",async (req,res)=>{
  const {cpf} = req.body
  if(!cpf || cpf == ""){
    res.status(422).json({message:"digite o cpf"})
  }else{
    const response = await db.query("select * from usuario where usuario.cpf = " + parseInt(cpf))
    if (response[0].length == 0) {
      res.status(200).json({
        message: "Usuário  não encontrado!",
        data: 0,
      });
    } else {
      res.status(200).json({
        message: "ok!",
        data: response[0][0],
      });
  }
}
})

module.exports = router;