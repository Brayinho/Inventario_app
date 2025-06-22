const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const router = express.Router();

// REGISTRO
router.post('/register', async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({ nombre, correo, password: hashedPassword });
        res.json({ message: 'Usuario creado', usuario: nuevoUsuario });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });

        const valido = await bcrypt.compare(password, usuario.password);
        if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, 'clave_secreta', { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
