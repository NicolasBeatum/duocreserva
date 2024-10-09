import express from 'express';
import { getAllComidas, getComida,createComida,updateComida,deleteComida} from '../controllers/ComidaController.js';
const router = express.Router();

router.get('/', (getAllComidas));
router.get('/:ID_Comida', (getComida));
router.post('/', (createComida));
router.put('/:ID_Comida', (updateComida));
router.delete('/:ID_Comida', (deleteComida));

export default router;