const Movimiento = require('../models/movimiento');
const Producto = require('../models/producto');

// movimiento.controller.js
exports.crearMovimiento = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const movimiento = await Movimiento.create({
            ...req.body,
            productoId: idProducto
        });
        res.json(movimiento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.obtenerMovimientos = async (req, res) => {
    try {
        const { idProducto } = req.params;

        const movimientos = await Movimiento.findAll({
            where: { productoId: idProducto },
            order: [['fecha', 'ASC']] // Opcional: ordena cronológicamente
        });

        res.json(movimientos);
    } catch (err) {
        console.error('❌ Error en crearMovimiento:', err); // 👈 muy importante
        res.status(500).json({ error: err.message });
    }
};
