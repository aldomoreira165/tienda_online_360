const express = require('express');

const { 
    actualizarCliente, 
    crearCliente, 
    obtenerClientes,
    obtenerClienteId
} = require('./../controllers/clienteController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/')
    .get(obtenerClientes)
    .post(crearCliente);

router
    .route('/:id')
    .get(verificarAuth, verificarRol([2]), obtenerClienteId)
    .put(verificarAuth, verificarRol([2]), actualizarCliente)

module.exports = router;