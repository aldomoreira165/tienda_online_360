const express = require('express');
const morgan = require('morgan');

const productoRouter = require('./routes/productoRoutes');
const estadoRouter = require('./routes/estadoRoutes');
const categoriaRouter = require('./routes/categoriaRoutes');
const usuarioRouter = require('./routes/usuarioRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/productos', productoRouter)
app.use('/api/v1/estados', estadoRouter)
app.use('/api/v1/categorias', categoriaRouter)
app.use('/api/v1/usuarios', usuarioRouter)

module.exports = app;