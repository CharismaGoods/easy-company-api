const {validateUpdatePCategory, validateAddPCategory} = require('../validators/pricecategories.validator');
const {getPriceCategories, getPriceCategoryById, addPriceCategory, updatePriceCategory} = require('../controllers/pricecategories.controller');

const express = require('express');
const router = express.Router();


router.get('/', getPriceCategories);
router.post('/',validateAddPCategory, addPriceCategory);
router.put('/', validateUpdatePCategory, updatePriceCategory);
router.get('/:id', getPriceCategoryById);



module.exports = router;