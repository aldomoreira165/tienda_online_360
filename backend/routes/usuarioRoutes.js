const express = require('express');

const { 
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioId,
    obtenerUsuarioActivo,
    obtenerUsuarioInactivo,
    activarUsuario,
    inactivarUsuario
} = require('./../controllers/usuarioController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/')
    .post(crearUsuario)

    router
    .route('/activos')
    .get(verificarAuth, verificarRol([2]), obtenerUsuarioActivo)

router
    .route('/inactivos')
    .get(verificarAuth, verificarRol([2]), obtenerUsuarioInactivo)

router
    .route('/activar/:id')
    .put(verificarAuth, verificarRol([2]), activarUsuario)
    
router
    .route('/inactivar/:id')
    .put(verificarAuth, verificarRol([2]), inactivarUsuario)

router
    .route('/:id')
    .get(verificarAuth, verificarRol([1, 2]), obtenerUsuarioId)
    .put(verificarAuth, verificarRol([1, 2]), actualizarUsuario)
    
module.exports = router;