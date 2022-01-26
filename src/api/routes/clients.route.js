const {validateUpdateClient, validateAddClient} = require('../validators/clients.validator');

const {getClients, getClientById, addClient, updateClient} = require('../controllers/clients.controller');
const express = require('express');
const router = express.Router();

router.get('/', getClients);
router.post('/',validateAddClient, addClient);
router.put('/', validateUpdateClient, updateClient);
router.get('/:id', getClientById);


//router.route('/').get(getClients).post(addClient).put(updateClient);
//router.get('/:id', getClientById);


module.exports = router;