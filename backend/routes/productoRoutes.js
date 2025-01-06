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

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/')
    .get(verificarRol([2]), obtenerProductos)
    .post(verificarRol([2]), crearProducto);

router
    .route('/activos')
    .get(verificarRol([1]), obtenerProductosActivos)

router
    .route('/:id')
    .get(verificarRol([2]), obtenerProductoId)
    .put(verificarRol([2]), actualizarProducto)

router
    .route('/incrementarStock/:id')
    .put(verificarRol([1, 2]), incrementarStockProducto)

router
    .route('/reducirStock/:id')
    .put(verificarRol([1, 2]), reducirStockProducto)

module.exports = router;