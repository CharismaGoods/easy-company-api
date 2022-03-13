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

            let tmp =  await super.update('products', flated);
    
            return tmp;
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
     * @param {int} product_id : the product id
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
                        FROM price_categories AS pc
                        INNER JOIN products_price_categories AS ppc ON ppc.price_category_id = pc.id
                        INNER JOIN products ON ppc.product_id = products.id
                        WHERE products.id = ?;`;
            //'product_category_price' AS pricing_type
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

    static assignPCategory = async (id, pcategory_id) => {
        try {
            let flated = flatObject({product_id: id, price_category_id: pcategory_id});

            return await super.add('products_price_categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static unassignPCategory = async (id, pcategory_id) => {
        try {
            let sql = `DELETE FROM products_price_categories WHERE product_id =? AND price_category_id = ?`;

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
            let sql = `DELETE FROM products WHERE id = ?;`;
            
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

module.exports = ProductRepository;