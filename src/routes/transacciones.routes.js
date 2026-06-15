import { Router } from 'express';
const router = Router();

import { create, getAll, getByEmail, getByIdiomas } from '../controllers/TransaccionController.js';

// Fixed routes FIRST
router.get('/cliente/:email', getByEmail);
router.get('/idiomas/:origen/:destino', getByIdiomas);
// Then parameterized
router.post('/', create);
router.get('/', getAll);

export default router;
