const express = require('express');

const { 
    obtenerCategorias, 
    obtenerCategoriaId, 
    crearCategoria, 
    actualizarCategoria 
} = require('./../controllers/categoriaController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);

router
    .route('/')
    .get(obtenerCategorias) 
    .post(crearCategoria)
    
router
    .route('/:id')
    .get(obtenerCategoriaId)
    .put(actualizarCategoria)

module.exports = router;