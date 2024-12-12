const express = require('express');

const { 
    obtenerProductos, 
    obtenerProductoId, 
    crearProducto, 
    actualizarProducto 
} = require('../controllers/productoController');

const router = express.Router();

router
    .route('/')
    .get(obtenerProductos)
    .post(crearProducto)

router
    .route('/:id')
    .get(obtenerProductoId)
    .put(actualizarProducto)

module.exports = router;