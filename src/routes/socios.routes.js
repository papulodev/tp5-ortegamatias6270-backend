import { Router } from 'express';
const router = Router();

import { create, getAll, getActivos, getById, update, remove } from '../controllers/SocioController.js';

// Fixed routes FIRST
router.get('/activos', getActivos);
// Then parameterized
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
