import db from "../database/db.js";
import { DataTypes } from 'sequelize';
import UsuarioModel from './UsuarioModel.js';
import AlmuerzoModel from './AlmuerzoModel.js';
import EstadoPedidoModel from './EstadoPedidoModel.js';

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

},{
    tableName: 'pedido',
    timestamps: false
});

// Definición de las relaciones
PedidoModel.belongsTo(UsuarioModel, { foreignKey: 'ID_Usuario' });
PedidoModel.belongsTo(AlmuerzoModel, { foreignKey: 'ID_Almuerzo' });
PedidoModel.belongsTo(EstadoPedidoModel, { foreignKey: 'ID_Estado' });

export default PedidoModel;