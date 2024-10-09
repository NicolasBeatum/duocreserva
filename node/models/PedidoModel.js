import db from "../database/db";
import { DataTypes } from 'sequelize';
import UsuarioModel from './UsuarioModel';
import AlmuerzoModel from './AlmuerzoModel';
import EstadoPedidoModel from './EstadoPedidoModel';

const PedidoModel = db.define('pedido', {
    ID_Pedido: { type: DataTypes.INTEGER, primaryKey: true },
    ID_Usuario: { 
        type: DataTypes.INTEGER,
        references: {
            model: UsuarioModel,
            key: 'ID_Usuario'
        }
    },
    ID_Almuerzo: { 
        type: DataTypes.INTEGER,
        references: {
            model: AlmuerzoModel,
            key: 'ID_Almuerzo'
        }
    },
    ID_Estado: { 
        type: DataTypes.INTEGER,
        references: {
            model: EstadoPedidoModel,
            key: 'ID_Estado'
        }
    },
    FechaPedido: { type: DataTypes.DATE }
});

// Definición de las relaciones
PedidoModel.belongsTo(UsuarioModel, { foreignKey: 'ID_Usuario' });
PedidoModel.belongsTo(AlmuerzoModel, { foreignKey: 'ID_Almuerzo' });
PedidoModel.belongsTo(EstadoPedidoModel, { foreignKey: 'ID_Estado' });

export default PedidoModel;