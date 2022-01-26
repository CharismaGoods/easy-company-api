const {getProducts, addProduct, updateProduct, getProductById, getPriceCategories, getPriceCategoriesOfClient} = require('../controllers/products.controller');
const express = require('express');
const { validateAddProduct, validateUpdateProduct } = require('../validators/products.validator');
const router = express.Router();


router.get('/', getProducts);
router.post('/',validateAddProduct, addProduct);
router.put('/', validateUpdateProduct, updateProduct);
router.get('/:id', getProductById);
router.get('/:id/price-categories', getPriceCategories);
router.get('/:id/price-categories-of-client/:client_id', getPriceCategoriesOfClient);


module.exports = router;