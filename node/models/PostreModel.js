import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const PostreModel = db.define('postre', {
    ID_Postre: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
},{
    tableName: 'postre', //Verificar
    timestamps: false //Obligatorio para que no cree las columnas de createdAt y updatedAt
});

export default PostreModel;