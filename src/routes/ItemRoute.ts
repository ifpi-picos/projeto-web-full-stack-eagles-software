import express from 'express';
import multer from 'multer';
import { createItem, getItems, getItem, updateItem, deleteItem } from '../controllers/ItemController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Rota para obter todos os itens
router.get('/', getItems);

// Rota para obter um item específico
router.get('/:id', getItem);

// Rota para criar um novo item
router.post('/', upload.single('foto'), createItem);

// Rota para atualizar um item
router.put('/:id', updateItem);

// Rota para excluir um item
router.delete('/:id', deleteItem);

export default router;

