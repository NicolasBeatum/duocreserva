import db from "../database/db.js";
import { DataTypes } from 'sequelize';
import TipoCuentaModel from './TipoCuentaModel.js';

const UsuarioModel = db.define('usuario', {
    ID_Usuario: { type: DataTypes.INTEGER, primaryKey: true },
    PrimerNombre: { type: DataTypes.STRING },
    ApellidoPaterno: { type: DataTypes.STRING },
    Email: { type: DataTypes.STRING, unique: true },
    Contraseña: { type: DataTypes.STRING },
    ID_TipoCuenta: { 
        type: DataTypes.INTEGER,
        references: {
            model: TipoCuentaModel,
            key: 'ID_TipoCuenta'
        }
    },
    Telefono: { type: DataTypes.STRING }
},{
    tableName: 'usuario',
    timestamps: false
});

UsuarioModel.belongsTo(TipoCuentaModel, { foreignKey: 'ID_TipoCuenta' });

export default UsuarioModel;