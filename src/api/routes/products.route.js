const {getProducts} = require('../controllers/prodcuts.controller');
const express = require('express');
const router = express.Router();


router.route('/').get(getProducts);

//router.get('/:id', getClientById);


module.exports = router;