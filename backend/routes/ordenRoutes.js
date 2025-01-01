const express = require('express');

const { 
    crearOrdenConDetalle, 
    obtenerOrdenes, 
    obtenerOrdenesUsuario, 
    obtenerOrdenId,
    obtenerOrdenesConfirmadas, 
    actualizarOrden,
    entregarOrden,
    rechazarOrden,
    cancelarOrden
} = require('./../controllers/ordenController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/')
    .get(verificarRol([2]), obtenerOrdenes)
    .post(verificarRol([1]), crearOrdenConDetalle)

router
    .route('/confirmadas')
    .get(verificarRol([2]), obtenerOrdenesConfirmadas)

router
    .route('/:id')
    .get(verificarRol([1, 2]), obtenerOrdenId)
    .put(verificarRol([1, 2]), actualizarOrden)

router
    .route('/usuario/:id')
    .get(verificarRol([1]), obtenerOrdenesUsuario)

router
    .route('/entregar/:id')
    .put(verificarRol([2]), entregarOrden)

router
    .route('/rechazar/:id')
    .put(verificarRol([2]), rechazarOrden)

router
    .route('/cancelar/:id')
    .put(verificarRol([1]), cancelarOrden)

module.exports = router;