const Producto = require('../models/producto');

exports.crearProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        // actualiza los campos que vengan en el body
        await Producto.update(req.body, { where: { id } });
        // devuelve el objeto actualizado
        const actualizado = await Producto.findByPk(id);
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        await Producto.destroy({ where: { id } });
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};