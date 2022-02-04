const {validateUpdateClient, validateAddClient} = require('../validators/clients.validator');

const {getClients, getClientById, addClient, updateClient,getProductPriceOfClient, assignProductPriceToClient, unassignProductPriceFromClient} = require('../controllers/clients.controller');
const express = require('express');
const router = express.Router();

router.get('/', getClients);
router.post('/',validateAddClient, addClient);
router.put('/', validateUpdateClient, updateClient);
router.get('/:id', getClientById);
router.get('/:id/product/:product_id', getProductPriceOfClient);
router.link('/:id/product/:product_id/:price', assignProductPriceToClient);
router.unlink('/:id/product/:product_id', unassignProductPriceFromClient);


//router.route('/').get(getClients).post(addClient).put(updateClient);
//router.get('/:id', getClientById);


module.exports = router;