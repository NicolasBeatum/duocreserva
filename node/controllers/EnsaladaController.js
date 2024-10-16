import EnsaladaModel from '../models/EnsaladaModel.js';

// Mostrar todas las Ensaladas
export const getEnsaladas = async (req, res) => {
    try {
        const ensalda = await EnsaladaModel.findAll();
        res.json(ensalda);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar una ensalada
export const getEnsalada = async (req, res) => {
    try {
        const ensalada = await EnsaladaModel.findOne({
            where: {
                ID_Ensalada: req.params.ID_Ensalada
            }
        });
        res.json(ensalada);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Crear una nueva ensalada
export const createEnsalada = async (req, res) => {
    try {
        await EnsaladaModel.create(req.body);
        res.json({
            "message": "¡Ensalada creada correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar una ensalada
export const updateEnsalada = async (req, res) => {
    try {
        await EnsaladaModel.update(req.body, {
            where: {
                ID_Ensalada: req.params.ID_Ensalada
            }
        });
        res.json({
            "message": "¡Ensalada actualizada correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar una ensalada
export const deleteEnsalada = async (req, res) => {
    try {
        await EnsaladaModel.destroy({
            where: {
                ID_Ensalada: req.params.ID_Ensalada
            }
        });
        res.json({
            "message": "¡Ensalada eliminada correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}