import UsuarioModel from '../models/UsuarioModel.js';

// Mostrar una comida
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findOne({
            where: {
                ID_Usuario: req.params.ID_Usuario
            }
        });
        res.json(usuario);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }
}