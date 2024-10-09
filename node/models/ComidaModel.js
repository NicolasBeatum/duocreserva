import db from "../database/db.js";
import { DataTypes } from 'sequelize';
import TipoComidaModel from './TipoComidaModel.js';

const ComidaModel = db.define('comida', {
    ID_Comida: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    ID_TipoComida: { 
        type: DataTypes.INTEGER,
        references: {
            model: TipoComidaModel,
            key: 'ID_TipoComida'
        }
    },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
});

// Definición de la relación
ComidaModel.belongsTo(TipoComidaModel, { foreignKey: 'ID_TipoComida' });

export default ComidaModel;