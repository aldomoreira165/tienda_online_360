const express = require('express');

const { crearEstado, obtenerEstados, obtenerEstadoId } = require('./../controllers/estadoController');

const router = express.Router();

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

router.use(verificarAuth);

router
    .route('/')
    .get(verificarRol([2]), obtenerEstados)
    .post(verificarRol([2]), crearEstado);

router
    .route('/:id')
    .get(verificarRol([2]), obtenerEstadoId)

module.exports = router;