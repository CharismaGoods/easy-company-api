/**
 * long description for the file
 *
 * @summary short description for the file
 * @author Husam Burhan
 *
 * Created at     : 2022-01-23 00:52:15 
 * Last modified  : 2022-02-06 23:06:52
 */

const { getEntityById, getEntities, addEntity, updateEntity } = require('../helpers/utilities');
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

const updateCategory = async (req, res) => {
    let category = req.category;

    return await updateEntity(res,
        CategoryRepository,
        category,
        { "1062": "The name you specified is duplicated",
          "1452": "The parent category you specified is not found" });
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory };
