const {getCategories, getCategoryById, addCategory, updateCategory, getSubCategories} = require('../controllers/categories');
const express = require('express');
const router = express.Router();


router.route('/').get(getCategories).post(addCategory).put(updateCategory);

router.get('/:category_id/subcategories', getSubCategories);
router.get('/:id', getCategoryById);



module.exports = router;