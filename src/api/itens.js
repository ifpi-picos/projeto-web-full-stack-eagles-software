const express = require('express')
const router = express.Router()
const {item} = require('../models')
const ItemService = require('../services/itens')
const {body, check, validationResult} = require('express-validator')


const itemService = new ItemService(item)

//Listar Itens
router.get('/', async (req, res) => {
    const itens = await itemService.get()
    res.status(200).json(itens)
})

//Criar Itens
router.post('/', 
    body('achadoPor')
      .not().isEmpty().withMessage('O campo "achadoPor" é obrigatório.')
      .escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/).withMessage('O campo "achadoPor" não pode conter caracteres especiais.'),

    check('local')
      .not().isEmpty().withMessage('O campo "local" é obrigatório.')
      .escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('O campo "local" não pode conter caracteres especiais.'),

    check('armazenado')
      .not().isEmpty().withMessage('O campo "armazenado" é obrigatório.')
      .escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('O campo "armazenado" não pode conter caracteres especiais.'),

    check('data').not().isEmpty().withMessage('O campo "data" é obrigatório.'),

    check('detalhes')
      .not().isEmpty().withMessage('O campo "descrição" é obrigatório.')
      .escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('O campo "descrição" não pode conter caracteres especiais.'),

    check('imagem_URL'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {achadoPor, local, armazenado, data, detalhes, imagem_URL} = req.body
    try{
    await itemService.adicionar({achadoPor, local, armazenado, data, detalhes, imagem_URL})
    res.status(201).send('Item adicionado com sucesso!')
    } catch(erro){
        res.status(400).send(erro.message)
    }

})

//Atualizar Item
router.put('/:id',
    body('achadoPor')
      .not().isEmpty().withMessage('O campo "achadoPor" é obrigatório.')
      .escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/).withMessage('O campo "achadoPor" não pode conter caracteres especiais.'),

    check('local')
      .not().isEmpty().withMessage('O campo "local" é obrigatório.')
      .escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('O campo "local" não pode conter caracteres especiais.'),

    check('armazenado')
      .not().isEmpty().withMessage('O campo "armazenado" é obrigatório.')
      .escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('O campo "armazenado" não pode conter caracteres especiais.'),

    check('data').not().isEmpty().withMessage('O campo "data" é obrigatório.'),

    check('detalhes')
      .not().isEmpty().withMessage('O campo "descrição" é obrigatório.')
      .escape().matches(/^[a-zA-Z0-9\s]+$/).withMessage('O campo "descrição" não pode conter caracteres especiais.'),

    check('imagem_URL'),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
      }
  
      const itemId = req.params.id;
      const {achadoPor, local, armazenado, data, detalhes, imagem_URL} = req.body;
  
      try {
        await itemService.atualizar(itemId, {achadoPor, local, armazenado, data, detalhes, imagem_URL});
        res.status(200).send('Item atualizado com sucesso!');
      } catch (erro) {
        res.status(400).send(erro.message);
      }
    }
  );
  
//Deletar Item
router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      await itemService.excluir(itemId);
      res.status(200).send('Item excluído com sucesso!');
    } catch (erro) {
      res.status(400).send(erro.message);
    }
});

// Listar Itens em ordem cronológica (mais recente para o mais antigo)
router.get('/recentes', async (req, res) => {
  try {
      const itens = await itemService.get();
      const itensOrdenados = itens.sort((a, b) => new Date(b.data) - new Date(a.data));
      res.status(200).json(itensOrdenados);
  } catch (erro) {
      res.status(500).send(erro.message);
  }
});

// Listar Itens em ordem cronológica (mais antigo para o mais recente)
router.get('/antigos', async (req, res) => {
  try {
      const itens = await itemService.get();
      const itensOrdenados = itens.sort((a, b) => new Date(a.data) - new Date(b.data));
      res.status(200).json(itensOrdenados);
  } catch (erro) {
      res.status(500).send(erro.message);
  }
});

// Listar itens com base no campo "AchadoPor"
router.get('/pesquisar/achadoPor/:nome', async (req, res) => {
  const nome = req.params.nome;
  try {
      const itens = await itemService.pesquisarPorAchadoPor(nome);
      res.status(200).json(itens);
  } catch (erro) {
      res.status(500).send(erro.message);
  }
});

//Listar itens com base no campo "Armazenado"
router.get('/pesquisar/armazenado/:armazenado', async (req, res) => {
  const armazenado = req.params.armazenado;
  try {
      const itens = await itemService.pesquisarPorArmazenado(armazenado);
      res.status(200).json(itens);
  } catch (erro) {
      res.status(500).send(erro.message);
  }
});

// Listar itens com base no campo "Local"
router.get('/pesquisar/local/:local', async (req, res) => {
  const local = req.params.local;
  try {
      const itens = await itemService.pesquisarPorLocal(local);
      res.status(200).json(itens);
  } catch (erro) {
      res.status(500).send(erro.message);
  }
});

// Listar itens com base no campo "Detalhes"
router.get('/pesquisar/detalhes/:termo', async (req, res) => {
  const termo = req.params.termo;
  try {
      const itens = await itemService.pesquisarPorDetalhes(termo);
      res.status(200).json(itens);
  } catch (erro) {
      res.status(500).send(erro.message);
  }
});

module.exports = router