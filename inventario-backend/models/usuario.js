const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Usuario;
