const { getEntityById, getEntities, addEntity } = require('../helpers/utilities');
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

/*const addPriceCategory = async (req, res) => {
    let pcategory = req.pcategory;

    try {
        let result = await PCategoryRepository.add(pcategory);

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

const updatePriceCategory = async (req, res) => {
    let pcategory = req.pcategory;

    try {
        let result = await PCategoryRepository.update(pcategory);

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
}

module.exports = { getPriceCategories, getPriceCategoryById, addPriceCategory, updatePriceCategory };