import PostreModel from '../models/PostreModel.js';

// Mostrar todos los postres
export const getPostres = async (req, res) => {
    try {
        const postre = await PostreModel.findAll();
        res.json(postre);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar un postre
export const getPostre = async (req, res) => {
    try {
        const postre = await PostreModel.findOne({
            where: {
                ID_Postre: req.params.ID_Postre
            }
        });
        res.json(postre);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Crear un nuevo postre
export const createPostre = async (req, res) => {
    try {
        await PostreModel.create(req.body);
        res.json({
            "message": "¡Postre creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar un postre
export const updatePostre = async (req, res) => {
    try {
        await PostreModel.update(req.body, {
            where: {
                ID_Postre: req.params.ID_Postre
            }
        });
        res.json({
            "message": "¡Postre actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar un postre
export const deletePostre = async (req, res) => {
    try {
        await PostreModel.destroy({
            where: {
                ID_Postre: req.params.ID_Postre
            }
        });
        res.json({
            "message": "¡Postre eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}