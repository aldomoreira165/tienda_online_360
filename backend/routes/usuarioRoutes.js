const express = require('express');

const { crearUsuarioOperador } = require('./../controllers/usuarioController');

const router = express.Router();

router
    .route('/')
    .post(crearUsuarioOperador)

module.exports = router;