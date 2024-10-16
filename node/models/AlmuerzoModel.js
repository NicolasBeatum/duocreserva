import db from "../database/db.js";
import { DataTypes } from 'sequelize';
import ComidaModel from './ComidaModel.js';
import PostreModel from './PostreModel.js';
import JugoModel from './JugoModel.js';
import EnsaladaModel from './EnsaladaModel.js';

const AlmuerzoModel = db.define('almuerzo', {
    ID_Almuerzo: { type: DataTypes.INTEGER, primaryKey: true },
    ID_Comida: { type: DataTypes.INTEGER },
    ID_Postre: { type: DataTypes.INTEGER },
    ID_Jugo: { type: DataTypes.INTEGER },
    ID_Ensalada: { type: DataTypes.INTEGER },
    PrecioTotal: { type: DataTypes.INTEGER }
});

// Definición de las relaciones
AlmuerzoModel.belongsTo(ComidaModel, { foreignKey: 'ID_Comida' });
AlmuerzoModel.belongsTo(PostreModel, { foreignKey: 'ID_Postre' });
AlmuerzoModel.belongsTo(JugoModel, { foreignKey: 'ID_Jugo' });
AlmuerzoModel.belongsTo(EnsaladaModel, { foreignKey: 'ID_Ensalada' });

export default AlmuerzoModel;