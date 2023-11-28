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
  body('achadoPor').not().isEmpty().trim().escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/),
  check('local').not().isEmpty(),
  check('armazenado').not().isEmpty(),
  check('data').not().isEmpty(),
  check('detalhes').not().isEmpty(),
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
    body('achadoPor').not().isEmpty().trim().escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/),
    check('local').not().isEmpty(),
    check('armazenado').not().isEmpty(),
    check('data').not().isEmpty(),
    check('detalhes').not().isEmpty(),
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
  


module.exports = router