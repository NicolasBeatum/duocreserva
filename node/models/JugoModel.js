import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const JugoModel = db.define('jugo', {
    ID_Jugo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
},{
    tableName: 'jugo', //Verificar
    timestamps: false //Obligatorio para que no cree las columnas de createdAt y updatedAt
});

export default JugoModel;