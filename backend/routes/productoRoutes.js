const express = require('express');

const { 
    obtenerProductos, 
    obtenerProductoId,
    obtenerProductosActivos, 
    crearProducto, 
    actualizarProducto 
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

module.exports = router;