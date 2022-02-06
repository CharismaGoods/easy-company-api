const { getEntityById, getEntities, addEntity, updateEntity } = require('../helpers/utilities');
const PCategoryRepository = require('../repository/PCategoryRepository');

const getPriceCategories = async (req, res) => {
    return await getEntities(req, res, PCategoryRepository);
}

const getPriceCategoryById = async (req, res) => {
    return await getEntityById(req, res, PCategoryRepository);
}

const addPriceCategory = async (req, res) => {
    let pcategory = req.pcategory;

    return await addEntity(res,
        PCategoryRepository,
        pcategory,
        { "1062": "TThe name you specified is duplicated" });
}

const updatePriceCategory = async (req, res) => {
    let pcategory = req.pcategory;

    return await updateEntity(res,
        PCategoryRepository,
        pcategory,
        { "1062": "TThe name you specified is duplicated" });
}

module.exports = { getPriceCategories, getPriceCategoryById, addPriceCategory, updatePriceCategory };