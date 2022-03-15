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
     * @param {int} client_id : the client id
     * @param {int} price_categroy_id : the price category id
     * 
     * Description: This method is used to get a list of price categories pirces dedicated to a spcecific.
     */
     static getPriceCategories = async (client_id) => {

        try {
            let sql = `SELECT  
                            clients.full_name AS client_fullname,
                            pc.id AS price_category_id,                            
                            pc.name AS price_category_name, 
                            pc.price AS price_category_price,  
                            cpc.price AS client_price_category_price                                                     
                        FROM price_categories AS pc
                        INNER JOIN clients_price_categories AS cpc ON pc.id = cpc.price_category_id
                        INNER JOIN clients ON cpc.client_id = clients.id                        
                        WHERE clients.id = ?;`;

            let values = [client_id];

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

    static assignCategoryPrice = async (id, pcategory_id, price) => {
        try {
            let flated = flatObject({ price_category_id: pcategory_id, client_id: id, price: price });

            return await super.add('clients_price_categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static unassignCategoryPrice = async (id, pcategory_id) => {
        try {
            let sql = `DELETE FROM clients_price_categories WHERE client_id = ? AND price_category_id =?`;
            
            let values = [id, pcategory_id];

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

    static delete = async (id) => {
        try {
            let sql = `DELETE FROM clients WHERE id = ?;`;
            
            let values = [id];

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