const express = require('express');
const morgan = require('morgan');

const productoRouter = require('./routes/productoRoutes');
const estadoRouter = require('./routes/estadoRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/productos', productoRouter)
app.use('/api/v1/estados', estadoRouter)

module.exports = app;