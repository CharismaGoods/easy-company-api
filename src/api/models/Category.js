const pool = require('../helpers/mysql');
const SubCategory = require('./SubCategory');

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.sub_categories = [];
    }

    static getCategoryById = async (id) => {
        try {
            const sql = `SELECT * 
                        FROM categories 
                        WHERE id =?`;
            const values = [id];

            let results = await pool.query(sql, values);

            if (results.length == 1) {
                return new Category(results[0].id, results[0].name);
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static getCategories = async (name) => {
        let sql = '';
        let values = [];

        try {
            if (name) {
                sql = `SELECT * 
                        FROM categories 
                        WHERE name LIKE ?
                        ORDER BY name;`;

                values.push(`%${name}%`);                
            }
            else {
                sql = `SELECT * 
                        FROM categories`;
            }

            let results = await pool.query(sql, values);

            if (results.length > 0) {
                return results.map(r => new Category(r.id, r.name));
            }
            else {
                return null;
            }
        }
        catch (err) {            
            throw err;
        }
    }

    static getSubCategories = async (category_id) => {
        let sql = '';
        let values = [];        

        try {
            sql = `SELECT * 
                        FROM sub_categories 
                        WHERE category_id  = ?
                        ORDER BY name;`;

            values.push(`${category_id}`); 

            let results = await pool.query(sql, values);

            if (results.length > 0) {
                return results.map(r => new SubCategory(r.id, r.name));
            }
            else {
                return null;
            }
        }
        catch (err) {                   
            throw err;
        }
    }

    static addCategory = async (name) => {
        const sql = `INSERT INTO categories(name)
                            VALUES (?)`;

        const values = [name];

        let result = await pool.query(sql, values);        

        if (result.affectedRows == 1) {
            return result.insertId;
        }
        else {
            return null;
        }      
    }

    static updateCategory = async (id, name) => {
        const sql = `UPDATE categories 
                        SET name = ?                                    
                        WHERE id = ?`;

        const values = [name, id];        

        let result = await pool.query(sql, values);        

        if (result.affectedRows == 1) {
            return id;
        }
        else {
            return null;
        }      
    }
}

module.exports = Category;