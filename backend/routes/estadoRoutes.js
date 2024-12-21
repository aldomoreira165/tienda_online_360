const express = require('express');

const { crearEstado, obtenerEstados, obtenerEstadoId } = require('./../controllers/estadoController');

const router = express.Router();

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

router.use(verificarAuth);

router
    .route('/')
    .get(obtenerEstados)
    .post(crearEstado)

router
    .route('/:id')
    .get(obtenerEstadoId)

module.exports = router;