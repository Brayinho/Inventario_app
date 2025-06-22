const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Producto = require('./producto');

const Movimiento = db.define('Movimiento', {
    tipo: { type: DataTypes.ENUM('compra', 'venta'), allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    valorUnitario: { type: DataTypes.FLOAT, allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Producto.hasMany(Movimiento, { foreignKey: 'productoId' });
Movimiento.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = Movimiento;
