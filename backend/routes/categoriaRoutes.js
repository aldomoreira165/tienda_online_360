const express = require('express');

const { 
    obtenerCategorias, 
    obtenerCategoriaId, 
    crearCategoria, 
    actualizarCategoria 
} = require('./../controllers/categoriaController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router.use(verificarAuth);
router.use(verificarRol([2]));

router
    .route('/')
    .get(obtenerCategorias)
    .post(crearCategoria)
    
router
    .route('/:id')
    .get(obtenerCategoriaId)
    .put(actualizarCategoria)

module.exports = router;