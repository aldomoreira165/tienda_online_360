const express = require('express');

const { obtenerProductos } = require('../controllers/productoController');

const router = express.Router();

router
    .route('/')
    .get(obtenerProductos)

module.exports = router;