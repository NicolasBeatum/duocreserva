import PedidoModel from '../models/PedidoModel.js';



//agregar pedido
export const createPedido = async (req, res) => {
    try {
        // Crear un nuevo pedido
        const nuevoPedido = {
            ID_Usuario: req.body.ID_Usuario,   
            ID_Almuerzo: req.body.ID_Almuerzo,  
            ID_Estado: req.body.ID_Estado || 1, 
            FechaPedido: new Date()             
        };

        // Insertar el pedido en la base de datos
        await PedidoModel.create(nuevoPedido);

        res.json({
            message: "¡Pedido creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};