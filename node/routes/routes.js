import express from 'express';
import { getAllComidas, getComida, createComida, updateComida, deleteComida } from '../controllers/ComidaController.js';
import { getUsuario, getUsuarios,createUsuario, updateUsuario, deleteUsuario } from '../controllers/UsuarioController.js';

const router = express.Router();

// Rutas para comidas
router.get('/comidas', getAllComidas);
router.get('/comidas/:ID_Comida', getComida);
router.post('/comidas', createComida);
router.put('/comidas/:ID_Comida', updateComida);
router.delete('/comidas/:ID_Comida', deleteComida);

// Rutas para usuarios
router.get('/usuario/:ID_Usuario', getUsuario);
router.get('/usuario', getUsuarios);
router.post('/usuario', createUsuario);
router.put('/usuario/:ID_Usuario', updateUsuario);
router.delete('/usuario/:ID_Usuario', deleteUsuario);

export default router;