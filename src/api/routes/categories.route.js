const {validateUpdateCategory, validateAddCategory} = require('../validators/categories.validator');

const {getCategories, getCategoryById, addCategory, updateCategory} = require('../controllers/categories.controller');
const express = require('express');
const router = express.Router();

router.get('/', getCategories);
router.post('/',validateAddCategory, addCategory);
router.put('/', validateUpdateCategory, updateCategory);
router.get('/:id', getCategoryById);

//router.route('/').get(getCategories).post(addCategory).put(updateCategory);
//router.get('/:category_id/subcategories', getSubCategories);
//router.get('/:id', getCategoryById);



module.exports = router;