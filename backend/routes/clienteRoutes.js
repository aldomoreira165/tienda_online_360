const express = require('express');

const { 
    actualizarCliente, 
    crearCliente, 
    obtenerClientes,
    obtenerClienteId
} = require('./../controllers/clienteController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/')
    .get(obtenerClientes)
    .post(crearCliente);

router
    .route('/:id')
    .get(verificarAuth, obtenerClienteId)
    .put(verificarAuth, actualizarCliente)

module.exports = router;