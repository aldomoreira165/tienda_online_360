const express = require('express');

const { login, logout } = require('./../controllers/authController');

const { verificarAuth } = require('./../middlewares/verificarAutenticacion');

const router = express.Router();

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .delete(verificarAuth, logout)

module.exports = router;