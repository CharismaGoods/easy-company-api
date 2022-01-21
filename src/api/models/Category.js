const pool = require('../helpers/mysql');

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    /**
     * 
     * @param {int} id 
     * @returns A category with specified 'id', or null.
     */
    static getById = async (id) => {
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

    /**
     * 
     * @param {stirng} name 
     * @returns All categories (in case of missing the 'name' parameter), matched categories accourding to 'name' parameter, or null.
     */
    static getByName = async (name) => {
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

    /**
     * 
     * @param {stirng} name 
     * @returns the id of inserted category.
     */
    static add = async (name) => {
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

    /**
     * 
     * @param {int} id
     * @param {stirng} name 
     * @returns the id of the affected category.
     */
    static update = async (id, name) => {
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