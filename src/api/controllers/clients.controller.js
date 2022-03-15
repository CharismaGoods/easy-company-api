/**
 * long description for the file
 *
 * @summary short description for the file
 * @author Husam Burhan
 *
 * Created at     : 2022-01-22 22:24:46 
 * Last modified  : 2022-03-15 10:35:31
 */


const { getEntityById, getEntities, addEntity, updateEntity } = require('../helpers/utilities');
const ClientRepository = require('../repository/ClientRepository');

const getClients = async (req, res) => {
    return await getEntities(req, res, ClientRepository);
}

const getClientById = async (req, res) => {
    return await getEntityById(req, res, ClientRepository)
}

const addClient = async (req, res) => {
    let client = req.client;

    return await addEntity(res,
        ClientRepository,
        client,
        { "1062": "The name or email you specified is duplicated" });
}

const updateClient = async (req, res) => {
    let client = req.client;

    return await updateEntity(res,
        ClientRepository,
        client,
        { "1062": "The name or email you specified is duplicated" });
}

const assignPCategoryToClient = async (req, res) => {
    const id = req.params.id;
    const pcategory_id = req.params.pcategory_id;
    const price = req.params.price;

    try {
        if (id && pcategory_id && price) {
            let result = await ClientRepository.assignCategoryPrice(id, pcategory_id, price);

            if (result || result === 0) {
                res.json({ success: 'yes', msg: 'assignment succeeded' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not assign this price to the specified client.' });
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

const unassignPCategoryFromClient = async (req, res) => {
    const id = req.params.id;
    const pcategory_id = req.params.pcategory_id;

    try {
        if (id && pcategory_id) {
            let result = await ClientRepository.unassignCategoryPrice(id, pcategory_id);

            if (result) {
                res.json({ success: 'yes', msg: 'unassignment succeeded' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not unassing this price from the specified client.' });
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


const getPriceCategories = async (req, res) => {
    const id = req.params.id;
    
    try {
        if (id) {
            let price_categories_of_client = await ClientRepository.getPriceCategories(id);
            if (price_categories_of_client === null) {
                res.status(404).json({});
            }
            else {
                res.json(price_categories_of_client);
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

const deleteClient = async (req, res) => {
    let id = req.params.id;

    try {
        if (id) {
            let result = await ClientRepository.delete(id);

            if (result) {
                res.json({ success: 'yes', msg: 'client deleted' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not delete this client.' });
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        if(err.errno === 1451){
            res.status(500).json({ success: 'no', msg: 'The specified client has a relation with other entities.' });
        }
        else{
            res.status(500).json({ success: 'no', msg: err.sqlMessage });
        }
    }
}

module.exports = {
    getClients,
    getClientById,
    addClient,
    updateClient,
    getPriceCategories,
    assignPCategoryToClient,
    unassignPCategoryFromClient,
    deleteClient
};