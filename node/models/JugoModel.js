import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const JugoModel = db.define('jugo', {
    ID_Jugo: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
},{
    tableName: 'jugo', 
    timestamps: false
});

export default JugoModel;