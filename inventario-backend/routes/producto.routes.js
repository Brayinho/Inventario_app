const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/producto.controller');

router.post('/', ctrl.crearProducto);
router.get('/', ctrl.obtenerProductos);
router.put    ('/:id', ctrl.actualizarProducto);
router.delete ('/:id', ctrl.eliminarProducto);
module.exports = router;
