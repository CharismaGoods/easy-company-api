const {validateUpdateClient, validateAddClient} = require('../validators/clients.validator');

const {getClients, getClientById, addClient, updateClient,getPriceCategories, assignPCategoryToClient, unassignPCategoryFromClient, deleteClient} = require('../controllers/clients.controller');
const express = require('express');
const router = express.Router();

router.get('/', getClients);
router.post('/',validateAddClient, addClient);
router.put('/', validateUpdateClient, updateClient);
router.get('/:id', getClientById);
router.get('/:id/price-categories', getPriceCategories);
router.link('/:id/price-category/:pcategory_id/price/:price', assignPCategoryToClient);
router.unlink('/:id/price-category/:pcategory_id', unassignPCategoryFromClient);
router.delete('/:id', deleteClient);

//router.route('/').get(getClients).post(addClient).put(updateClient);
//router.get('/:id', getClientById);


module.exports = router;