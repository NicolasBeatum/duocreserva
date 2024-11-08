import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const EstadoPedidoModel = db.define('estadopedido', {
    ID_Estado: { type: DataTypes.INTEGER, primaryKey: true },
    Estado: { type: DataTypes.STRING }

},{
    timestamps: false,
    tableName: 'estadopedido'
});

export default EstadoPedidoModel;