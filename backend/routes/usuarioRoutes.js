const express = require('express');

const { 
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioId,
    obtenerUsuarioEmail,
    obtenerUsuarioActivo,
    obtenerUsuarioInactivo,
    activarUsuario,
    inactivarUsuario
} = require('./../controllers/usuarioController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/')
    .post(crearUsuario)

    router
    .route('/activos')
    .get(verificarAuth, obtenerUsuarioActivo)

router
    .route('/inactivos')
    .get(verificarAuth, obtenerUsuarioInactivo)

router
    .route('/activar/:id')
    .put(verificarAuth, activarUsuario)
    
router
    .route('/inactivar/:id')
    .put(verificarAuth, inactivarUsuario)

router
    .route('/email/:email')
    .get(verificarAuth, obtenerUsuarioEmail)

router
    .route('/:id')
    .get(verificarAuth, obtenerUsuarioId)
    .put(verificarAuth, actualizarUsuario)
    
module.exports = router;