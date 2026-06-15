import { Router } from 'express';
const router = Router();

import { create, getAll, getById } from '../controllers/EmpleadoController.js';

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);

export default router;
