import PedidoModel from '../models/PedidoModel.js';

//mostrar todos los pedidos realizados por un usuario

export const getPedidosByUsuario = async (req, res) => {
    try {
        const { ID_Usuario } = req.params;  // Obtener el ID del usuario desde los parámetros de la URL

        // Consultar todos los pedidos que pertenezcan a ese usuario
        const pedido = await PedidoModel.findAll({
            where: { ID_Usuario: ID_Usuario } 
        });

        
        if (pedido.length > 0) {
            res.json(pedido);  
        } else {
            res.json({
                message: "No se encontraron pedidos para este usuario."
            });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

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


