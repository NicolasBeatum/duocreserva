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
// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    try {
        await UsuarioModel.create(req.body);
        res.json({
            "message": "¡Usuario creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        await UsuarioModel.update(req.body, {
            where: {
                ID_Usuario: req.params.ID_Usuario
            }
        });
        res.json({
            "message": "¡Usuario actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        await UsuarioModel.destroy({
            where: {
                ID_Usuario: req.params.ID_Usuario
            }
        });
        res.json({
            "message": "¡Usuario eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}