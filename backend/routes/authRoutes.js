const express = require('express');

const { login, logout } = require('./../controllers/authController');

const { verificarAuth, verificarRol } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .delete(verificarAuth, verificarRol([1, 2]), logout)

module.exports = router;