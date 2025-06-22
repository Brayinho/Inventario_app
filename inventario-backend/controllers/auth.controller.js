const Usuario = require('../models/usuario'); // Asegúrate de importar el modelo

const registrar = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contraseña
        });

        res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

module.exports = { registrar };
