const { replaceUndefined } = require('../helpers/utilities');
const Category = require('../models/Category');


const getCategories = async (req, res) => {
    const { name } = req.query;

    try {
        let categories = await Category.getByName(name);

        if (categories === null) {
            res.status(404).json({});
        }
        else if (categories.length == 1) {
            res.json(categories[0]);
        }
        else if (categories.length > 1) {
            res.json(categories)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const getSubCategories = async (req, res) => {
    const category_id = req.params.category_id;
    
    try {
        let sub_categories = await Category.getSubCategories(category_id);

        if (sub_categories === null) {
            res.status(404).json({});
        }
        else if (sub_categories.length == 1) {
            res.json(sub_categories[0]);
        }
        else if (sub_categories.length > 1) {
            res.json(sub_categories)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const getCategoryById = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let category = await Category.getById(id);
            if (category === null) {
                res.status(404).json({});
            }
            else {
                res.json(category);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const addCategory = async (req, res) => {
    let { name } = req.body;

    try {
        if (name) {

            //replace 'undefined' with empty standard-string.
            name = replaceUndefined(name);

            let result = await Category.add(name);

            if (result) {
                res.status(201).json({ success: 'yes', id: result });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'Error has occured when insert' });
            }
        }
        else {
            res.status(422).json({ success: 'no', msg: 'missing field(s): name' });
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}


const updateCategory = async (req, res) => {
    let { id, name } = req.body;

    try{
        if (name && id) {
            //replace 'undefined' with empty standard-string.
            name = replaceUndefined(name);
    
            let result = await Category.update(id, name);
    
            if (result) {
                res.json({ success: 'yes', id: result });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'Error has occured when update' });
            }
    
        }
        else {
            res.status(422).json({ success: 'no', msg: 'missing field(s): name and/or id' });
        }
    }
    catch(err){        
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory, getSubCategories };
