import Sequelize from 'sequelize';

const db = new Sequelize("reservaalmuerzos", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
});

export default db;