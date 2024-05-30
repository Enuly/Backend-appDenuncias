const express = require("express");
const router = express.Router();
const db = require("../db/conectdb.js");
//Manipulação CRUD do usuário
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
    const responseCpf = await db.query(
      "select cpf from usuario where usuario.cpf = " + CPF
    );
    const responseEmail = await db.query(
      "select email from usuario where usuario.email = '" + Email + "'"
    );
    console.log(responseEmail[0].length != 0);
    if (responseCpf[0].length == [] && responseEmail[0].length == 0) {
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
      res.status(200).json({
        cpfIsLogged: false,
        emailIsLogged: false,
        created: true,
        message: "Usuário cadastrado com sucesso!",
      });
    } else {
      const cpfIsLogged = responseCpf[0][0] != undefined;
      const emailIsLogged = responseEmail[0][0] != undefined;
      res.status(200).json({
        cpfIsLogged: cpfIsLogged,
        emailIsLogged: emailIsLogged,
        message: "Cpf cadastrado",
      });
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
router.post("/getData", async (req, res) => {
  const { cpf } = req.body;
  if (!cpf || cpf == "") {
    res.status(422).json({ message: "digite o cpf" });
  } else {
    const response = await db.query(
      "select * from usuario where usuario.cpf = " + parseInt(cpf)
    );
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
});
//Manipulação CRUD das Denuncias
router.post("/makeComplaint", async (req, res) => {
  const { titulo, descricao, fkUsuario, locate } = req.body;
  if (
    !titulo ||
    titulo == "" ||
    !descricao ||
    descricao == "" ||
    !fkUsuario ||
    fkUsuario == ""||
    !locate ||
    locate == ""
  ) {
    res
      .status(200)
      .json({ isFieled: false, message: "Preencha todos os dados" });
  } else {
    try {
      await db.query(
        "insert into denuncia(titulo,StatusDenun, Descricao, fk_Usuario_cpf, localizacao) values ('" +
          titulo +
          "', 'Em progresso','" +
          descricao +
          "'," +
          fkUsuario +",'"+locate+"'"+")"
      );
      res.status(200).json({message:"Denuncia feita!", isComplained:true})
    } catch (error) {
      res.status(400).json({message:"Denuncia não feita!", isComplained:false, erro:error})
    }
  }
});
router.post("/getDenunciaToShow",async (req, res) =>{
  var {ids} = req.body
  console.log(req.body)
  try{
    if(!ids || ids.length == 0){
      const response = await db.query(`select * from denuncia order by data_current desc limit 6`)
      res.status(200).json({data:response[0]})
    }else{
      const response = await db.query(`select * from denuncia where id_denuncia not in (${ids}) order by data_current desc limit 6`)
      res.status(200).json({data:response[0]})
    }
    
  }catch(erro){
    res.status(422).json({erro:erro})
  }
})
router.post("/updateStatus", async (req, res)=>{
  const {idDenuncia} = req.body 
  try {
    await db.query("update denuncia set StatusDenun = 'Concluido' where id_denuncia = " + idDenuncia)
    res.status(200).json({message:"Atualizado com sucesso!",isSuccess:true})
  } catch (error) {
    res.status(422).json({erro:error})
  }
})
 
module.exports = router;
