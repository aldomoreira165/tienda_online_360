const express = require('express');

const { 
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    obtenerUsuarioId,
    obtenerUsuarioActivo,
    obtenerUsuarioInactivo,
    activarUsuario,
    inactivarUsuario
} = require('./../controllers/usuarioController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/')
    .post(verificarRol([2]), crearUsuario)
    .get(verificarRol([2]), obtenerUsuarios)

    router
    .route('/activos')
    .get(verificarRol([2]), obtenerUsuarioActivo)

router
    .route('/inactivos')
    .get(verificarRol([2]), obtenerUsuarioInactivo)

router
    .route('/activar/:id')
    .put(verificarRol([2]), activarUsuario)
    
router
    .route('/inactivar/:id')
    .put(verificarRol([2]), inactivarUsuario)

router
    .route('/:id')
    .get(verificarRol([1, 2]), obtenerUsuarioId)
    .put(verificarRol([1, 2]), actualizarUsuario)
    
module.exports = router;