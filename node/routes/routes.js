import express from 'express';
import { getAllComidas, getComida,createComida,updateComida,deleteComida} from '../controllers/ComidaController.js';
import { getUsuario, getUsuarios} from '../controllers/UsuarioController.js';
const router = express.Router();

router.get('/', (getAllComidas));
router.get('/:ID_Comida', (getComida));
router.post('/', (createComida));
router.put('/:ID_Comida', (updateComida));
router.delete('/:ID_Comida', (deleteComida));

router.get('/usuario/:ID_Usuario', (getUsuario));
router.get('/usuario', (getUsuarios));

export default router;