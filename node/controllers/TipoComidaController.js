import TipoComidaModel from '../models/TipoComidaModel.js';



// Obtener todos los tipos de comida
export const getIDTiposComida = async (req, res) => {
    try {
        const tiposComida = await TipoComidaModel.findAll({
            attributes: ['ID_TipoComida'] 
        });
        res.status(200).json(tiposComida);
    } catch (error) {
        console.error('Error al obtener tipos de comida:', error);
        res.status(500).json({ message: 'Error al obtener tipos de comida' });
    }
};

export const getNombreTiposComida = async (req, res) => {
    try {
        const tiposComida = await TipoComidaModel.findAll({
            attributes: ['Nombre'] 
        });
        res.status(200).json(tiposComida);
    } catch (error) {
        console.error('Error al obtener tipos de comida:', error);
        res.status(500).json({ message: 'Error al obtener tipos de comida' });
    }
};