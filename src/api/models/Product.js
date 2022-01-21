/**
 * This file contains the Product class that is responsile for all operations related 
 * to products. Including get available prices of a product accourding to a client
 * or a price category(s)
 *
 * @summary Product class.
 * @author Husam Burhan
 *
 * Created at     : 2022-01-19 16:44:43 
 * Last modified  : 2022-01-21 12:11:43
 */

const pool = require('../helpers/mysql');
const ClientPriceCategory = require('../models/ClientPriceCategory');
const PriceCategory = require('../models/PriceCategory');

class Product {
    constructor(id, category_id, name, brand, sku, measurement_unit, net_weight, gross_weight, ar_description, en_description, de_description, thumbnail) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.brand = brand;
        this.SKU = sku;
        this.measurement_unit = measurement_unit;
        this.net_weight = net_weight;
        this.gross_weight = gross_weight;
        this.ar_description = ar_description;
        this.en_description = en_description;
        this.de_description = de_description;
        this.thumbnail = thumbnail;
    }

    static getProductById = async (id) => {
        try {
            const sql = `SELECT * 
                        FROM products 
                        WHERE id =?`;
            const values = [id];

            let results = await pool.query(sql, values);

            if (results.length == 1) {
                return new Product(results[0].id,
                    results[0].category_id,
                    results[0].name,
                    results[0].brand,
                    results[0].sku,
                    results[0].measurement_unit,
                    results[0].net_weight,
                    results[0].gross_weight,
                    results[0].ar_description,
                    results[0].en_description,
                    results[0].de_description,
                    results[0].thumbnail);
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static getProducts = async (name) => {
        let sql = '';
        let values = [];

        try {
            if (name) {
                sql = `SELECT * 
                        FROM products 
                        WHERE name LIKE ?
                        ORDER BY name;`;

                values.push(`%${name}%`);
            }
            else {
                sql = `SELECT * 
                        FROM products`;
            }

            let results = await pool.query(sql, values);

            if (results.length > 0) {
                return results.map(r => new Product(r.id,
                    r.category_id,
                    r.name,
                    r.brand,
                    r.sku,
                    r.measurement_unit,
                    r.net_weight,
                    r.gross_weight,
                    r.ar_description,
                    r.en_description,
                    r.de_description,
                    r.thumbnail));
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static addProduct = async (category_id, name, brand, sku, measurement_unit, net_weight, gross_weight, ar_description, en_description, de_description, thumbnail) => {
        const sql = `INSERT INTO products(category_id, name, brand, sku, measurement_unit, net_weight, gross_weight, ar_description, en_description, de_description, thumbnail)
                            VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [category_id, name, brand, sku, measurement_unit, net_weight, gross_weight, ar_description, en_description, de_description, thumbnail];

        let result = await pool.query(sql, values);

        if (result.affectedRows == 1) {
            return result.insertId;
        }
        else {
            return null;
        }
    }

    static updateProduct = async (id, category_id, name, brand, sku, measurement_unit, net_weight, gross_weight, ar_description, en_description, de_description, thumbnail) => {
        const sql = `UPDATE products 
                        SET category_id = ? ,
                            name = ? ,
                            brand = ? ,
                            sku = ? ,
                            measurement_unit = ? ,
                            net_weight = ? ,
                            gross_weight = ? ,
                            ar_description = ? ,
                            en_description = ? ,
                            de_description = ? ,
                            thumbnail = ? ,                        
                        WHERE id = ?`;

        const values = [category_id, name, brand, sku, measurement_unit, net_weight, gross_weight, ar_description, en_description, de_description, thumbnail, id];

        let result = await pool.query(sql, values);

        if (result.affectedRows == 1) {
            return id;
        }
        else {
            return null;
        }
    }

    static addToPriceCategory = async (id, price_category_id) => {

    }

    /**
     * 
     * @param {int} id : the product id
     * 
     * Description: This method is used to get a list of product's prices according to the price categories.
     */
    static getProductPrices = async (product_id) => {
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
                return results.map(r => new PriceCategory(
                    r.price_category_id,
                    r.price_category_name,
                    r.price_category_price));
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
    static getProductPricesOfClient = async (product_id, client_id) => {
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
                return results.map(r => new ClientPriceCategory(
                    new PriceCategory(
                        r.price_category_id,
                        r.price_category_name,
                        r.price_category_price),
                    client_id,
                    r.client_full_name
                ));
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = Product;
