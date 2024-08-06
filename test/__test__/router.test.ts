import { Sequelize } from "sequelize";
jest.spyOn(Sequelize.prototype,'authenticate').mockResolvedValue({} as never)
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../../routers/router.js');


const app = express();
app.use(bodyParser.json());
app.use(router);

describe('POST /createUser', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 422 if any field is empty', async () => {
    
    jest.spyOn(Sequelize.prototype,'query')
    .mockResolvedValue([[]] as never)
    .mockResolvedValue([[]] as never)
    .mockResolvedValue([[]] as never)
    .mockResolvedValue([[]] as never)
    const response = await request(app)
      .post('/createUser')
      .send({
        nome: '',
        Email: '',
        CPF: '',
        Senha: '',
        CEP: '',
        Endereco: ''
      });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('preencha todos os seus dados! fi de corno');
  });

  it('should return 422 if any field is missing', async () => {
    const response = await request(app)
      .post('/createUser')
      .send({
        nome: 'John Doe',
        Email: 'john@example.com',
        CPF: '12345678901',
        Senha: 'password',
        CEP: '12345-678'
        // Endereco is missing
      });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('preencha todos os seus dados! fi de corno');
  });

  it('should return 200 and create user if all fields are valid and user does not exist', async () => {
    jest.spyOn(Sequelize.prototype,'authenticate').mockResolvedValue({} as never)
   jest.spyOn(Sequelize.prototype,'query')
   .mockResolvedValue([[]] as never)
   .mockResolvedValue([[]] as never)
   .mockResolvedValue([[]] as never)
   .mockResolvedValue([[]] as never)
    const response = await request(app)
      .post('/createUser')
      .send({
        nome: 'John Doe',
        Email: 'john@example.com',
        CPF: '12345678901',
        Senha: 'password',
        CEP: '12345-678',
        Endereco: '123 Main St'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      cpfIsLogged: false,
      emailIsLogged: false,
      created: true,
      message: 'Usuário cadastrado com sucesso!'
    });
  });

  it('should return 200 and indicate CPF or Email is already registered', async () => {
    jest.spyOn(Sequelize.prototype,'authenticate').mockResolvedValue({} as never)
    jest.spyOn(Sequelize.prototype,'query')
    .mockResolvedValue([[]] as never)
    .mockResolvedValue([[]] as never)
    .mockResolvedValue([[]] as never)
    .mockResolvedValue([[]] as never)

    const response = await request(app)
      .post('/createUser')
      .send({
        nome: 'John Doe',
        Email: 'john@example.com',
        CPF: '12345678901',
        Senha: 'password',
        CEP: '12345-678',
        Endereco: '123 Main St'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      message: 'Usuário cadastrado com sucesso!'
    }));
  });
});