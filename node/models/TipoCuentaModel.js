import db from "../database/db";
import { DataTypes } from 'sequelize';

const TipoCuentaModel = db.define('tipocuenta', {
    ID_TipoCuenta: { type: DataTypes.INTEGER, primaryKey: true },
    Nombre: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING }
});

export default TipoCuentaModel;