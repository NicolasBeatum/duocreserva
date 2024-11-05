import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const TipoComidaModel = db.define('tipocomida', {
    ID_TipoComida: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING }
},{
    tableName: 'tipocomida', // Especifica el nombre exacto de la tabla
    timestamps: false
});

export default TipoComidaModel;