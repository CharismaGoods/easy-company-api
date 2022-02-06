/**
 * long description for the file
 *
 * @summary short description for the file
 * @author Husam Burhan
 *
 * Created at     : 2022-01-23 00:52:15 
 * Last modified  : 2022-02-06 19:33:55
 */

const { getEntityById, getEntities, addEntity } = require('../helpers/utilities');
const CategoryRepository = require('../repository/CategoryRepository');

const getCategories = async (req, res) => {
    return await getEntities(req, res, CategoryRepository);
}

const getCategoryById = async (req, res) => {
    return await getEntityById(req, res, CategoryRepository);
}

const addCategory = async (req, res) => {
    let category = req.category;

    return await addEntity(res,
        CategoryRepository,
        category,
        { "1062": "The name you specified is duplicated",
          "1452": "The parent category you specified is not found" });
}

/*const addCategory = async (req, res) => {
    let category = req.category;

    try {
        let result = await CategoryRepository.add(category);

        if (result) {
            res.status(201).json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when insert' });
        }
    }
    catch (err) {
        let err_msg = '';

        if (err.errno) {
            if (err.errno === 1062) {
                //value duplication
                err_msg = 'The name you specified is duplicated'
            }
            else {
                err_msg = err.sqlMessage;
            }
        }
        else {
            err_msg = err.sqlMessage;
        }

        res.status(500).json({ success: 'no', msg: err_msg });
    }
}*/


const updateCategory = async (req, res) => {
    const category = req.category;

    try {
        let result = await CategoryRepository.update(category);

        if (result) {
            res.json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when update' });
        }
    }
    catch (err) {
        let err_msg = '';

        if (err.errno) {
            if (err.errno === 1452) {
                //Forign-key violation
                err_msg = 'The parent category you specified is not found'
            }
            else if (err.errno === 1062) {
                //value duplication
                err_msg = 'The name you specified is duplicated'
            }
            else {
                err_msg = err.sqlMessage;
            }
        }
        else {
            err_msg = err.sqlMessage;
        }

        res.status(500).json({ success: 'no', msg: err_msg });
    }
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory };
