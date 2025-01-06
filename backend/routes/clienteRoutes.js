const express = require('express');

const { 
    actualizarCliente, 
    crearCliente, 
    obtenerClientes,
    obtenerClienteId
} = require('./../controllers/clienteController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);
router.use(verificarRol([2]));

router
    .route('/')
    .get(obtenerClientes)
    .post(crearCliente);

router
    .route('/:id')
    .get(obtenerClienteId)
    .put(actualizarCliente)

module.exports = router;