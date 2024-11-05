import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const PostreModel = db.define('postre', {
    ID_Postre: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
},{
    tableName: 'postre', 
    timestamps: false 
});

export default PostreModel;