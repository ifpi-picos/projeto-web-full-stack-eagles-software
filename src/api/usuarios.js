const express = require('express')
const router = express.Router()
const {usuario} = require('../models')
const UsuarioService = require('../services/usuarios')
const {body, check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

function generateToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
}

const usuarioService = new UsuarioService(usuario)

//Listar Usuários
router.get('/', async (req, res) => {
    const usuarios = await usuarioService.get()
    res.status(200).json(usuarios)
})

//Criar Usuário
router.post('/',
  body('nome').not().isEmpty().trim().escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/),
  check('email').not().isEmpty().isEmail(),
  check('senha')
    .not().isEmpty()
    .isLength({ min: 8 })
    .withMessage('A senha deve conter no mínimo 8 caracteres!'),
  check('usuario_IMG'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha, usuario_IMG} = req.body;

    try {
      const existingUserByEmail = await usuario.findOne({ where: { email } });

      if (existingUserByEmail) {
        return res.status(400).json({ error: 'Já existe um usuário cadastrado com esse e-mail!' });
      }

      await usuarioService.adicionar({ nome, email, senha, usuario_IMG});

      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      
    } catch (erro) {
      res.status(400).send(erro.message);
    }
  }
);

//Atualizar Usuário
router.put('/:id', 
    body('nome').not().isEmpty().trim().escape().matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/),
    check('email').not().isEmpty(),
    check('senha').not().isEmpty().isLength({min: 8}).withMessage('A senha deve conter no mínimo 8 caracteres!'),
    check('usuario_IMG'),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
      }
  
      const usuarioId = req.params.id;
      const {nome, email, senha, usuario_IMG} = req.body;
  
      try {
        await usuarioService.atualizar(usuarioId, {nome, email, senha, usuario_IMG});
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

//Autenticar Usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await usuario.findOne({ where: { email } });

    if (!user || user.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar um novo token
    const token = generateToken(user.id);

    // Retornar os dados do usuário junto com o token
    res.status(200).json({ user: { id: user.id, nome: user.nome, email: user.email }, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.userId = user.userId;
    next();
  });
};

// Rota para obter o perfil do usuário
router.get('/perfil', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await usuario.findByPk(userId, { attributes: ['nome', 'email', 'usuario_IMG'] });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ nome: user.nome, email: user.email, usuario_IMG: user.usuario_IMG });

  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router