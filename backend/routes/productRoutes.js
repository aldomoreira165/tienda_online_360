const express = require('express');

const { getAllProducts } = require('./../controllers/productController');
const { route } = require('../app');

const router = express.Router();

router
    .route('/')
    .get(getAllProducts)

module.exports = router;