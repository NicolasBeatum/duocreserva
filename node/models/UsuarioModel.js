import db from "../database/db";
import { DataTypes } from 'sequelize';
import TipoCuentaModel from './TipoCuentaModel';

const UsuarioModel = db.define('usuario', {
    ID_Usuario: { type: DataTypes.INTEGER, primaryKey: true },
    PrimerNombre: { type: DataTypes.STRING },
    ApellidoPaterno: { type: DataTypes.STRING },
    Email: { type: DataTypes.STRING },
    Contraseña: { type: DataTypes.STRING },
    ID_TipoCuenta: { 
        type: DataTypes.INTEGER,
        references: {
            model: TipoCuentaModel,
            key: 'ID_TipoCuenta'
        }
    },
    Telefono: { type: DataTypes.STRING }
});

// Definición de la relación
UsuarioModel.belongsTo(TipoCuentaModel, { foreignKey: 'ID_TipoCuenta' });

export default UsuarioModel;