// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventario_db', 'root', 'Bjop2005', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
