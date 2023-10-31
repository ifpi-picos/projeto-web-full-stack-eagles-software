const express = require('express')
const router = express.Router()
const {usuario} = require('../models')
const UsuarioService = require('../services/usuarios')
const {body, check, validationResult} = require('express-validator')


const usuarioService = new UsuarioService(usuario)

//Listar Usuários
router.get('/', async (req, res) => {
    const usuarios = await usuarioService.get()
    res.status(200).json(usuarios)
})

//Criar Usuário
router.post('/',  
  body('nome').not().isEmpty().trim().escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/),
  check('senha')
    .not().isEmpty()
    .isLength({min: 8})
    .withMessage('A senha deve conter no mínimo 8 caracteres!'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {nome, email, senha} = req.body
    try{
    await usuarioService.adicionar({nome, email, senha})
    res.status(201).send('Usuário adicionado com sucesso!')
    } catch(erro){
        res.status(400).send(erro.message)
    }
})

//Atualizar Usuário
router.put('/:id', 
    body('nome').not().isEmpty().trim().escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/),
    check('email').not().isEmpty(),
    check('senha').not().isEmpty().isLength({min: 8}).withMessage('A senha deve conter no mínimo 8 caracteres!'),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
      }
  
      const usuarioId = req.params.id;
      const {nome, email, senha} = req.body;
  
      try {
        await usuarioService.atualizar(usuarioId, {nome, email, senha});
        res.status(200).send('Usuário atualizado com sucesso!');
      } catch (erro) {
        res.status(400).send(erro.message);
      }
    }
  );
  
//Deletar Usuário
router.delete('/:id', async (req, res) => {
    const usuarioId = req.params.id;
  
    try {
      await usuarioService.excluir(usuarioId);
      res.status(200).send('Usuário excluído com sucesso!');
    } catch (erro) {
      res.status(400).send(erro.message);
    }
});

module.exports = router