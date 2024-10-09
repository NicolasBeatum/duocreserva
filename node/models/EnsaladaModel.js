import db from "../database/db";
import { DataTypes } from 'sequelize';

const EnsaladaModel = db.define('ensalada', {
    ID_Ensalada: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER }
});

export default EnsaladaModel;