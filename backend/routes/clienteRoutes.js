const express = require('express');

const { actualizarCliente } = require('./../controllers/clienteController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/:id')
    .put(actualizarCliente)

module.exports = router;