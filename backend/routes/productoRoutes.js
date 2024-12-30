const express = require('express');

const { 
    obtenerProductos, 
    obtenerProductoId,
    obtenerProductosActivos, 
    crearProducto, 
    actualizarProducto,
    incrementarStockProducto,
    reducirStockProducto
} = require('../controllers/productoController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/')
    .get(obtenerProductos)
    .post(crearProducto)

router
    .route('/activos')
    .get(obtenerProductosActivos)

router
    .route('/:id')
    .get(obtenerProductoId)
    .put(actualizarProducto)

router
    .route('/incrementarStock/:id')
    .put(incrementarStockProducto)

router
    .route('/reducirStock/:id')
    .put(reducirStockProducto)

module.exports = router;