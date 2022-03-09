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
        { "1062": "The name you specified is duplicated" });
}

const updatePriceCategory = async (req, res) => {
    let pcategory = req.pcategory;

    return await updateEntity(res,
        PCategoryRepository,
        pcategory,
        { "1062": "The name you specified is duplicated" });
}

const deletePriceCategory = async (req, res) => {
    let id = req.params.id;

    try {
        if (id) {
            let result = await PCategoryRepository.delete(id);

            if (result) {
                res.json({ success: 'yes', msg: 'price category deleted' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not delete this price category.' });
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        if(err.errno === 1451){
            res.status(500).json({ success: 'no', msg: 'The specified price category has a relation between a product(s) or/and a client(s)' });
        }
        else{
            res.status(500).json({ success: 'no', msg: err.sqlMessage });
        }
    }
    
}

module.exports = {
    getPriceCategories,
    getPriceCategoryById,
    addPriceCategory,
    updatePriceCategory,
    deletePriceCategory
};