/**
 * long description for the file
 *
 * @summary short description for the file
 * @author Husam Burhan
 *
 * Created at     : 2022-01-22 22:24:46 
 * Last modified  : 2022-01-25 19:58:10
 */


const ClientRepository = require('../repository/ClientRepository');

const getClients = async (req, res) => {
    const { full_name } = req.query;

    try {
        let clients = await ClientRepository.find(full_name);

        if (clients === null) {
            res.status(404).json({});
        }
        else if (clients.length === 1) {
            res.json(clients[0]);
        }
        else if (clients.length > 1) {
            res.json(clients)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}

const getClientById = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let client = await ClientRepository.getById(id);
            if (client === null) {
                res.status(404).json({});
            }
            else {
                res.json(client);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}


const addClient = async (req, res) => {
    let client = req.client;

    try {
        let result = await ClientRepository.add(client);

        if (result) {
            res.status(201).json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when insert' });
        }

    }
    catch (err) {
        let err_msg = '';

        if (err.errno) {
            if (err.errno === 1062) {
                //value duplication
                err_msg = 'The name you specified is duplicated'
            }
            else {
                err_msg = err.sqlMessage;
            }
        }
        else {
            err_msg = err.sqlMessage;
        }

        res.status(500).json({ success: 'no', msg: err_msg });
    }
}


const updateClient = async (req, res) => {
    let client = req.client;

    try {
        let result = await ClientRepository.update(client);

        if (result) {
            res.json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when update' });
        }
    }
    catch (err) {
        let err_msg = '';

        if (err.errno) {
            /*if (err.errno === 1452) {
                //Forign-key violation
                err_msg = 'The parent category you specified is not found'
            }
            else*/ if(err.errno === 1062){
                //value duplication
                err_msg = 'The email you specified is duplicated'
            }
            else {
                err_msg = err.sqlMessage;
            }
        }
        else {
            err_msg = err.sqlMessage;
        }

        res.status(500).json({ success: 'no', msg: err_msg });
    }
}

module.exports = { getClients, getClientById, addClient, updateClient };