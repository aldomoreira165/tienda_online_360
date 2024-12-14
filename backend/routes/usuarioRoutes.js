const express = require('express');

const { crearUsuarioOperador, crearUsuarioCliente, actualizarUsuario } = require('./../controllers/usuarioController');

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
    .put(verificarAuth, actualizarUsuario)

module.exports = router;