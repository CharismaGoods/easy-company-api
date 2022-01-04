const {getClients, getClientById, addClient} = require('../controllers/clients-controller');
const express = require('express');
const router = express.Router();


router.route('/').get(getClients).post(addClient);

router.get('/:id', getClientById);


module.exports = router;