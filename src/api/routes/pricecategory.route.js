const {validateUpdatePCategory, validateAddPCategory} = require('../validators/pricecategories.validator');
const {getPriceCategories, getPriceCategoryById, addPriceCategory, updatePriceCategory, deletePriceCategory} = require('../controllers/pricecategories.controller');

const express = require('express');
const router = express.Router();


router.get('/', getPriceCategories);
router.post('/',validateAddPCategory, addPriceCategory);
router.put('/', validateUpdatePCategory, updatePriceCategory);
router.get('/:id', getPriceCategoryById);
router.delete('/:id', deletePriceCategory);


module.exports = router;