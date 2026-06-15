import { Router } from 'express';
const router = Router();

import { create, getAll, buscar, update, remove } from '../controllers/PublicacionController.js';

// Fixed routes FIRST
router.get('/buscar', buscar);
// Then parameterized
router.post('/', create);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
