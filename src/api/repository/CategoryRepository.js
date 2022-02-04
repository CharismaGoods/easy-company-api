const BaseRepository = require('./BaseRepository');
const { flatObject } = require('../helpers/utilities');

class CategoryRepository extends BaseRepository {
    static add = async (category) => {
        try {
            let flated = flatObject(category);

            return await super.add('categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static update = async (category) => {
        try {
            let flated = flatObject(category);

            return await super.update('categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * @description This method returns only one childs level of a specified parent.
     * @param {int} parent_id
     * @return list of child category objects of parent category or empty list.
     */
    static getChilds = async (parent_id) => {
        let results = await BaseRepository.customFind('categories', 'parent_id', parent_id);

        if (results.length > 0) {
            return results.map(r => ({ id: r.id, name: r.name, parent_id: parent_id }));
        }
        else {
            return [];
        }
    }

    static getById = async (id, include_childs) => {
        try {
            let matched_category = await super.getById('categories', 'id', id);
            let childs_cat = [];

            if (matched_category) {
                if (include_childs) {
                    childs_cat = await this.getChilds(matched_category.id);

                    matched_category.childs = childs_cat;
                }

                return matched_category;
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
            let results = await super.find('categories', 'name', name);

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
            let flated = flatObject({client_id: id, price_category_id: pcategory_id});

            return await super.add('clients_price_categories', flated);
        }
        catch (err) {
            throw err;
        }
    }

    static unassignPCategory = async (id, pcategory_id) => {
        try {
            let sql = `DELETE FROM clients_price_categories WHERE client_id =? AND price_category_id = ?`;

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
}

module.exports = CategoryRepository;