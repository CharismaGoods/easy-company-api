/**
* long description for the file
*
* @summary short description for the file
* @author Mohammad
* @review Husam Burhan
*
* Created at     : 2022-01-18 14:34:50 
 * Last modified  : 2022-01-23 00:57:36
*/

const pool = require('../helpers/mysql');
//const { getElements, getElementById } = require('./BaseModel');
const CCategory = require('./ClientsCategory');

class PriceCategory {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    get categoryId () {
        return this.id;
    }
    get categoryName () {
        return this.name;
    }
    get categoryPrice () {
        return this.price;
    }
    
    static getCategories = async (name) => {
        let aCategories = await getElements('price_categories', 'name', name);
        if (aCategories) {
            return aCategories.map(category => new Category(category.id, category.name, category.price));
        } else {
            return null;
        }
    }

    static getCategoryById = async (id) => {
        let category = await getElementById('price_categories', 'id', id);
        if (category) {
            return new Category(category.id, category.name, category.price);
        } else {
            return null;
        }
    }

    static addCategory = async (name, price) => {
        const sql = `INSERT INTO price_categories(name, price) VALUES (?, ?)`,
        values = [name, price];

        let result = await pool.query(sql, values);        
        if (result.affectedRows == 1) {
            return result.insertId;
        } else {
            return null;
        }
    }
 
    static updateCategory = async (id, name, price) => {
        const sql = `UPDATE price_categories 
            SET name = ?,
                price = ?
            WHERE id = ?`,
        values = [name, price, id];
        let result = await pool.query(sql, values);
        if (result.affectedRows == 1) {
            return id;
        } else {
            return null;
        }      
    }

}

module.exports = PriceCategory;