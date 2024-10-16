import express from 'express';
import { getAllComidas, getComida, createComida, updateComida, deleteComida } from '../controllers/ComidaController.js';
import { getUsuario, getUsuarios,createUsuario, updateUsuario, deleteUsuario } from '../controllers/UsuarioController.js';
import { getEnsaladas, getEnsalada, createEnsalada, updateEnsalada, deleteEnsalada } from '../controllers/EnsaladaController.js';
import { getPostres, getPostre, createPostre, updatePostre, deletePostre } from '../controllers/PostreController.js';
import { createPedido } from '../controllers/PedidoController.js';
import { getJugos, getJugo, createJugo, updateJugo, deleteJugo } from '../controllers/JugoController.js';

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

// Rutas para ensaladas
router.get('/ensalada', getEnsaladas);
router.get('/ensalada/:ID_Ensalada', getEnsalada);
router.post('/ensalada', createEnsalada);
router.put('/ensalada/:ID_Ensalada', updateEnsalada);
router.delete('/ensalada/:ID_Ensalada', deleteEnsalada);

// Rutas para postres
router.get('/postre', getPostres);
router.get('/postre/:ID_Postre', getPostre);
router.post('/postre', createPostre);
router.put('/postre/:ID_Postre', updatePostre);
router.delete('/postre/:ID_Postre', deletePostre);

router.post('/pedido',createPedido);

// Rutas para jugos
router.get('/jugo', getJugos);
router.get('/jugo/:ID_Jugo', getJugo);
router.post('/jugo', createJugo);
router.put('/jugo/:ID_Jugo', updateJugo);
router.delete('/jugo/:ID_Jugo', deleteJugo);

export default router;