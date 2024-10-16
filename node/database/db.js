import Sequelize from 'sequelize';

const db = new Sequelize("reservaalmuerzos", "root", "Malulo123malulo123.", {
    host: "localhost",
    dialect: "mysql",
});

export default db;