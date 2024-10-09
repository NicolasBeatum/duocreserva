import ComidaModel from '../models/ComidaModel.js';
//mostrar todas las comidas
export const getAllComidas = async (req, res) => {
    try {
        const comidas = await ComidaModel.findAll();
        res.json(comidas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//mostrar una comida
export const getComida = async (req, res) => {
    try {
        const comida = comida.findAll({
            where: {
                ID_Comida: req.params.ID_Comida
            }
        });
        res.json(comida);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//crear una comida
export const createComida = async (req, res) => {
    try {
        await ComidaModel.create(req.body); 
        res.json({ message: "Comida creada" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//actualizar una comida
export const updateComida = async (req, res) => {
    try {
       ComidaModel.updateComida(req.body, {
            where: {
                ID_Comida: req.params.ID_Comida
            }
        }); 
        res.json({ message: "Comida actualizada" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//eliminar una comida
export const deleteComida = async (req, res) => {
    try {
        ComidaModel.destroy({
            where: {
                ID_Comida: req.params.ID_Comida
            }
        });
        res.json({ message: "Comida eliminada" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

