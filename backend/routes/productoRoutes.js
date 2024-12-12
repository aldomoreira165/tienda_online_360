const express = require('express');

const { obtenerProductos, obtenerProductoId, crearProducto } = require('../controllers/productoController');

const router = express.Router();

router
    .route('/')
    .get(obtenerProductos)
    .post(crearProducto)

router
    .route('/:id')
    .get(obtenerProductoId)

module.exports = router;