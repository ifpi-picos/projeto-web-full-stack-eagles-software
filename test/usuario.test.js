const request = require('supertest');
const app = require('../src/app');

describe('Testes de Usuário', () => {
  
  it('Deve criar um novo usuário com campos válidos', async () => {
        const novoUsuario = {
          nome: 'test',
          email: 'test@example.com',
          senha: 'senha1234',
        };
      
        const response = await request(app)
          .post('/usuarios')
          .send(novoUsuario);
      
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário adicionado com sucesso!')
 })

  it('Deve retornar erro ao tentar criar um usuário sem nome', async () => {
    const usuarioSemNome = {
      email: 'teste@example.com',
      senha: 'senha1234',
    };
  
    const response = await request(app)
      .post('/usuarios')
      .send(usuarioSemNome);
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  
    const expectedErrorMessages = [
      'O campo "nome" é obrigatório.',
      'Invalid value',
    ];
  
    const receivedErrorMessages = response.body.errors.map(({ msg }) => msg);
  
    const isAtLeastOneErrorMessagePresent = expectedErrorMessages.some(errorMessage =>
      receivedErrorMessages.includes(errorMessage)
    );
  
    expect(isAtLeastOneErrorMessagePresent).toBe(true);
  });
  

  it('Deve retornar erro ao tentar criar um usuário com senha curta', async () => {
    const usuarioSenhaCurta = {
      nome: 'Teste',
      email: 'teste@example.com',
      senha: 'senha',
    };
  
    const response = await request(app)
      .post('/usuarios')
      .send(usuarioSenhaCurta);
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  
    const expectedError = {
      location: 'body',
      msg: 'A senha deve conter no mínimo 8 caracteres!',
      path: 'senha',
      type: 'field',
      value: 'senha',
    };

    expect(response.body.errors).toEqual([expectedError]);
  });
  
});

