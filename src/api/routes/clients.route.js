const {getClients, getClientById, addClient, updateClient} = require('../controllers/clients.controller');
const express = require('express');
const router = express.Router();


router.route('/').get(getClients).post(addClient).put(updateClient);

router.get('/:id', getClientById);


module.exports = router;