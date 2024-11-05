import JugoModel from '../models/JugoModel.js';

// Mostrar todos los Jugos
export const getJugos = async (req, res) => {
    try {
        const jugo = await JugoModel.findAll();
        res.json(jugo);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar un jugo
export const getJugo = async (req, res) => {
    try {
        const jugo = await JugoModel.findOne({
            where: {
                ID_Jugo: req.params.ID_Jugo
            }
        });
        res.json(jugo);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Crear una nuevo jugo
export const createJugo = async (req, res) => {
    try {
        await JugoModel.create(req.body);
        res.json({
            "message": "¡Jugo creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar un jugo
export const updateJugo = async (req, res) => {
    try {
        await JugoModel.update(req.body, {
            where: {
                ID_Jugo: req.params.ID_Jugo
            }
        });
        res.json({
            "message": "¡Jugo actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar un jugo
export const deleteJugo = async (req, res) => {
    try {
        await JugoModel.destroy({
            where: {
                ID_Jugo: req.params.ID_Jugo
            }
        });
        res.json({
            "message": "¡Jugo eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}