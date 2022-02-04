const BaseRepository = require('./BaseRepository');
const pool = require('../helpers/mysql');
const { flatObject } = require('../helpers/utilities');

class ClientRepository extends BaseRepository {
    static add = async (client) => {
        try {
            let flated = flatObject(client);

            return await super.add('clients', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static update = async (client) => {
        try {
            let flated = flatObject(client);

            return await super.update('clients', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static getById = async (id) => {
        try {
            let client = await super.getById('clients', 'id', id);

            if (client) {
                return client;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static find = async (full_name) => {
        try {
            let results = await super.find('clients', 'full_name', full_name);

            if (results.length > 0) {
                return results;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * 
    * @param {int} id : the client id
    * @param {int} product_id : the product id
    * 
    * Description: This method returns a client's price of a product.
    */
    static getProductPrice = async (id, product_id) => {
        try {
            let sql = `SELECT clients.full_name AS client_full_name, 
                                products.name AS product_name,
                                pcp.price AS client_price
                        FROM clients
                        INNER JOIN products_clients_prices AS pcp ON pcp.client_id = clients.id
                        INNER JOIN products ON pcp.product_id = products.id
                        WHERE pcp.product_id = ? && pcp.client_id = ?;`;

            let values = [product_id, id];

            let results = await pool.query(sql, values);            

            if (results.length > 0) {
                return results;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static assignProductPrice = async (id, product_id, price) => {
        try {
            let flated = flatObject({ product_id: product_id, client_id: id, price: price });

            return await super.add('products_clients_prices', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static unassignProductPrice = async (id, product_id) => {
        try {
            let sql = `DELETE FROM products_clients_prices WHERE client_id =? AND product_id = ?`;

            let values = [id, product_id];

            let result = await pool.query(sql, values);

            if (result.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = ClientRepository;