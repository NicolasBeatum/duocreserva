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