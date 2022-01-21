/**
* long description for the file
*
* @summary short description for the file
* @author Mohammad
*
* Created at     : 2022-01-18 14:34:50 
* Last modified  : 2022-01-18 14:35:07
*/

const pool = require('../helpers/mysql');
const { getElements, getElementById } = require('./BaseModel');

class Category {
    constructor(client_id, price_category_id, price) {
        this.clientId = client_id;
        this.priceCategoryId = price_category_id;
        this.price = price;
    }
    get clientId () {
        return this.clientId;
    }
    get PriceCategoryId () {
        return this.priceCategoryId;
    }
    get categoryPrice () {
        return this.price;
    }
    
    static getCategories = async (client_id) => {
        let aCategories = await getElements('clients_price_categories', 'client_id', client_id);
        if (aCategories) {
            return aCategories.map(category => new Category(category.clientId, category.priceCategoryId, category.price));
        } else {
            return null;
        }
    }

    static getCategoryById = async (client_id, price_category_id) => {
        let category = await getElementById('clients_price_categories',
            'client_id', id, client_id,
            'price_categroy_id', price_category_id);
        if (category) {
            return new Category(category.clientId, category.priceCategoryId, category.price);
        } else {
            return null;
        }
    }


}

module.exports = Category;