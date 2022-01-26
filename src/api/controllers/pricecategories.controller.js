const { replaceUndefined } = require('../helpers/utilities');

const { getElements, getElementById } = require('./baseController');
const Category = require('../models/PriceCategory');

const getCategories = async (req, res) => {
    getElements(req, res, Category.getCategories);
}

const getCategoryById = async (req, res) => {
    getElementById(req, res, Category.getCategoryById);
}

const addCategory = async (req, res) => {
    let { name,  price} = req.body;

    try {
        if (name && price) {
            //replace 'undefined' with empty standard-string.
            name = replaceUndefined(name);
            price = replaceUndefined(price);

            let result = await Category.addCategory(name, price);

            if (result) {
                res.json({ success: 'yes', id: result });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'Error has occured when insert' });
            }
        }
        else {
            res.status(422).json({ success: 'no', msg: 'missing field(s): name and/or price' });
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const updateCategory = async (req, res) => {
    let { id, name, price } = req.body;

    try{
        if (id && name && price) {
            //replace 'undefined' with empty standard-string.
            name = replaceUndefined(name);
            price = replaceUndefined(price);
    
            let result = await Category.updateCategory(id, name, price);
            if (result) {
                res.json({ success: 'yes', id: result });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'Error has occured when update' });
            }
        }
        else {
            res.status(422).json({ success: 'no', msg: 'missing field(s): name and/or id and/or price' });
        }
    }
    catch(err){        
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory };