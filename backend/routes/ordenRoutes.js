const express = require('express');

const { crearOrdenConDetalle, obtenerOrdenes, obtenerOrdenId, actualizarOrden  } = require('./../controllers/ordenController');

const router = express.Router();

router
    .route('/')
    .get(obtenerOrdenes)
    .post(crearOrdenConDetalle)

router
    .route('/:id')
    .get(obtenerOrdenId)
    .put(actualizarOrden)

module.exports = router;