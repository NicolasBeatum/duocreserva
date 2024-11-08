import db from "../database/db.js";
import { DataTypes } from 'sequelize';

const TipoComidaModel = db.define('tipocomida', {
    ID_TipoComida: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING }
});

export default TipoComidaModel;