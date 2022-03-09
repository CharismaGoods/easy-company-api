const BaseRepository = require('./BaseRepository');
const { flatObject } = require('../helpers/utilities');
const pool = require('../helpers/mysql');

class PCategoryRepository extends BaseRepository {
    static add = async (pcategory) => {
        try {
            let flated = flatObject(pcategory);

            return await super.add('price_categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static update = async (pcategory) => {
        try {
            let flated = flatObject(pcategory);

            return await super.update('price_categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static getById = async (id) => {
        try {
            let matched_pcategory = await super.getById('price_categories', 'id', id);

            if (matched_pcategory) {
                return matched_pcategory;
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
     * @param {string} name 
     * @returns 
     */
    static find = async (name) => {
        try {
            let results = await super.find('price_categories', 'name', name);

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


    static delete = async (id) => {
        try {
            let sql = `DELETE FROM price_categories WHERE id = ?;`;
            
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

module.exports = PCategoryRepository;