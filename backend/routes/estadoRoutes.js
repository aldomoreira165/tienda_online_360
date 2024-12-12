const express = require('express');

const { crearEstado, obtenerEstados, obtenerEstadoId } = require('./../controllers/estadoController');

const router = express.Router();

router
    .route('/')
    .get(obtenerEstados)
    .post(crearEstado)

router
    .route('/:id')
    .get(obtenerEstadoId)

module.exports = router;