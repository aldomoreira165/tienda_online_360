const express = require('express');

const { 
    actualizarCliente, 
    crearCliente, 
    obtenerClientes 
} = require('./../controllers/clienteController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/')
    .get(obtenerClientes)
    .post(crearCliente);

router
    .route('/:id')
    .put(verificarAuth, actualizarCliente)

module.exports = router;