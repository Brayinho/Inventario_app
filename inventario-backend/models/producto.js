const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Producto = db.define('Producto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Producto;
