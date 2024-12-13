const express = require('express');

const { actualizarCliente } = require('./../controllers/clienteController');

const router = express.Router();

router
    .route('/:id')
    .put(actualizarCliente)

module.exports = router;