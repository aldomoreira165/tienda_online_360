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

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/')
    .get(obtenerOrdenes)
    .post(crearOrdenConDetalle)

router
    .route('/confirmadas')
    .get(obtenerOrdenesConfirmadas)

router
    .route('/:id')
    .get(obtenerOrdenId)
    .put(actualizarOrden)

router
    .route('/usuario/:id')
    .get(obtenerOrdenesUsuario)

router
    .route('/entregar/:id')
    .put(entregarOrden)

router
    .route('/rechazar/:id')
    .put(rechazarOrden)

router
    .route('/cancelar/:id')
    .put(cancelarOrden)

module.exports = router;