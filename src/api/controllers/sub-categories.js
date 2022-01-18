const executeCommand = require('../helpers/db');
const { replaceUndefined } = require('../helpers/utilities');
const Category = require('../models/Category');

const getSubCategories = async (req, res) => {
    const { category_id } = req.query;
    let sql = '';

    let values = [];

    if (category_id) {
        sql = `SELECT * 
                FROM sub_categories 
                WHERE category_id = ?
                ORDER BY 'name';`;
        
        values.push(category_id);
    }
    else {
        sql = `SELECT * 
                FROM sub_categories`;
    }

    await executeCommand(sql,values, 'select', (result) => {
        if(result.success === 'no'){
            res.status(result.status_no).json(result.msg);
        }
        else{
            res.json(result.data);
        }            
    });
} 

const getSubCategoryById = async (req, res) => {
    const id = req.params.id;

    if (id) {
        const sql = `SELECT * 
                        FROM sub_categories 
                        WHERE id =?`;
        const values = [id];

        await executeCommand(sql, values, 'select', (result) => {
            if(result.success === 'no'){
                res.status(result.status_no).json(result.msg);
            }
            else{
                res.json(result.data);
            }            
        });
    }
    else {
        res.status(404).json({});
    }
}

const addSubCategory = async (req, res) => {
    let {category_id, name, price, price_wholesaler } = req.body;

    //check if category_id is a number or not.
    if (isNaN(category_id)){
        res.status(400).json({ success: 'no', msg: 'category_id should be a number' });
        return;
    }

    //check if price is a number or not.
    if (isNaN(price)){
        res.status(400).json({ success: 'no', msg: 'price should be a number' });
        return;
    }

    //check if price_wholesaler is a number or not.
    if (isNaN(price_wholesaler)){
        res.status(400).json({ success: 'no', msg: 'price_wholesaler should be a number' });
        return;
    }

    //check if category_id is belongs to a real category
    const result = Category.getCategoryById(category_id);

    if(result.success === 'no'){
        res.status(400).json('category not found');
        return;
    }

    if (name && price && price_wholesaler) {        
        //replace 'undefined' with empty standard-string.
        name = replaceUndefined(name);           

        const sql = `INSERT INTO sub_categories(category_id, name, price, price_wholesaler)
                            VALUES (?,?,?,?)`;

        const values = [category_id, name, price, price_wholesaler];
        
        await executeCommand(sql, values, 'insert', (result) => {            
            if(result.success === 'no'){                
                res.status(result.status_no).json(result.msg);
            }
            else{
                res.json(result)
            }            
        });
    }
    else {
        res.status(422).json({ success: 'no', msg: 'missing field(s): name' });
    }
}


const updateCategory = async (req, res) => {
    let {id, name} = req.body;

    if (name) {
        //replace 'undefined' with empty standard-string.
        name = replaceUndefined(name);
        
        const sql = `UPDATE categories 
                        SET name = ?                                    
                        WHERE id = ?`;

        const values = [name, id];
         
        await executeCommand(sql, values, 'update', (result) => {            
            if(result.success === 'no'){            
                res.status(result.status_no).json(result.msg);
            }
            else{
                res.json(result)
            }             
        });
    }
    else {
        res.status(422).json({ success: 'no', msg: 'missing field(s): category_id and/or name and/or price and/or price_wholesaler' });
    }
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory };
