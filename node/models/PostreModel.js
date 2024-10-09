import db from "../database/db";
import { DataTypes } from 'sequelize';

const PostreModel = db.define('postre', {
    ID_Postre: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
});

export default PostreModel;