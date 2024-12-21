const express = require('express');

const { 
    crearUsuarioOperador, 
    crearUsuarioCliente,
    actualizarUsuario,
    obtenerUsuarioId,
    obtenerUsuarioEmail
} = require('./../controllers/usuarioController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/operador')
    .post(crearUsuarioOperador)

router
    .route('/cliente')
    .post(crearUsuarioCliente)

router
    .route('/:id')
    .get(verificarAuth, obtenerUsuarioId)
    .put(verificarAuth, actualizarUsuario)

router
    .route('/email/:email')
    .get(verificarAuth, obtenerUsuarioEmail)

module.exports = router;