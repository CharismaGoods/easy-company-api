const { getProducts,
    addProduct,
    updateProduct,
    getProductById,
    getPriceCategories,
    assignPCategoryToProduct,
    unassignPCategoryFromProduct,
    deleteProduct } = require('../controllers/products.controller');

const express = require('express');
const { validateAddProduct, validateUpdateProduct } = require('../validators/products.validator');
const router = express.Router();

router.get('/', getProducts);
router.post('/', validateAddProduct, addProduct);
router.put('/', validateUpdateProduct, updateProduct);
router.get('/:id', getProductById);
router.get('/:id/price-categories', getPriceCategories);
router.link('/:id/price-category/:pcategory_id', assignPCategoryToProduct);
router.unlink('/:id/price-category/:pcategory_id', unassignPCategoryFromProduct);
router.delete('/:id', deleteProduct);


module.exports = router;