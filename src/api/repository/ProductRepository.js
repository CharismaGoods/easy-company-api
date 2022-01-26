const BaseRepository = require('./BaseRepository');
const {flatObject} = require('../helpers/utilities');
const pool = require('../helpers/mysql');

class ProductRepository extends BaseRepository {
    static add = async (product) => {
        try {
            let flated = flatObject(product);

            return await super.add('products', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static update = async (product) => {
        try {
            let flated = flatObject(product);

            return await super.update('products', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static getById = async (id) => {
        try {
            let product =  await super.getById('products', 'id', id);      
            
            if(product){
                return product;
            }
            else{
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static find = async (name) => {
        try {
            let results = await super.find('products', 'name', name);

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
     * @param {int} id : the product id
     * 
     * Description: This method is used to get a list of product's prices according to the price categories.
     */
    static getProductPriceCategories = async (product_id) => {
        
        try {
            let sql = `SELECT  
                            products.name AS product_name,
                            pc.id AS price_category_id,
                            pc.name AS price_category_name, 
                            pc.price AS price_category_price,
                            'product_category_price' AS pricing_type
                        FROM price_categories AS pc
                        INNER JOIN products_price_categories AS ppc ON ppc.price_category_id = pc.id
                        INNER JOIN products ON ppc.product_id = products.id
                        WHERE products.id = ?;`;

            let values = [product_id];

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


    /**
    * 
    * @param {int} id : the product id
    * @param {int} client_id : the client id
    * 
    * Description: This method is used to get a list of product's prices according to the client prices.
    */
     static getProductPriceCategoriesOfClient = async (product_id, client_id) => {
        try {
            let sql = `SELECT clients.full_name AS client_full_name, 
                            products.name AS product_name,
                            cpc.price AS client_price_category, 
                            pc.id AS price_category_id,
                            pc.name AS price_category_name, 
                            pc.price AS price_category_price,
                            'client_price' AS pricing_type
                        FROM clients
                        INNER JOIN clients_price_categories AS cpc ON clients.id = cpc.client_id
                        INNER JOIN price_categories AS pc ON cpc.price_category_id = pc.id
                        INNER JOIN products_price_categories AS ppc ON ppc.price_category_id = pc.id
                        INNER JOIN products ON ppc.product_id = products.id
                        WHERE products.id = ? AND clients.id = ?;`;

            let values = [product_id, client_id];

            let results = await pool.query(sql, values);

            if (results.length > 0) {
                //this means that there are specific price(s) for the client_id of this product_id
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

    static addToPriceCategory = async (id, price_category_id) => {

    }
}

module.exports = ProductRepository;