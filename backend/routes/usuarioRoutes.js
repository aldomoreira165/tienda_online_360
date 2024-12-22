const express = require('express');

const { 
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioId,
    obtenerUsuarioEmail
} = require('./../controllers/usuarioController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/')
    .post(crearUsuario)

router
    .route('/:id')
    .get(verificarAuth, obtenerUsuarioId)
    .put(verificarAuth, actualizarUsuario)

router
    .route('/email/:email')
    .get(verificarAuth, obtenerUsuarioEmail)

module.exports = router;