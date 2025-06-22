const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');

// ✅ Esto acepta POST /api/movimiento/:idProducto
router.post('/:idProducto', movimientoController.crearMovimiento);

// ✅ Esto acepta GET /api/movimiento/:idProducto
router.get('/:idProducto', movimientoController.obtenerMovimientos);

module.exports = router;
