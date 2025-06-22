const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const Producto = require('./models/producto');
const Movimiento = require('./models/movimiento');
const authRoutes = require('./routes/auth.routes');

const app = express(); // ✅ DEFINIR PRIMERO

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // ✅ USAR DESPUÉS

app.use('/api/producto', require('./routes/producto.routes'));
app.use('/api/movimiento', require('./routes/movimiento.routes'));

db.sync().then(() => {
    app.listen(4000, () => {
        console.log('Servidor backend en http://localhost:4000');
    });
});
