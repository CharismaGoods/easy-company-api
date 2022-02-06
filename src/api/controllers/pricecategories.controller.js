const { getEntityById } = require('../helpers/utilities');
const PCategoryRepository = require('../repository/PCategoryRepository');

const getPriceCategories = async (req, res) => {
    const { name } = req.query;

    try {
        let pcategories = await PCategoryRepository.find(name);

        if (pcategories === null) {
            res.status(404).json({});
        }
        else if (pcategories.length === 1) {
            res.json(pcategories[0]);
        }
        else if (pcategories.length > 1) {
            res.json(pcategories)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const getPriceCategoryById = async (req, res) => {
    return await getEntityById(req, res, PCategoryRepository);
}

/*const getPriceCategoryById = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let pcategory = await PCategoryRepository.getById(id);
            if (pcategory === null) {
                res.status(404).json({});
            }
            else {
                res.json(pcategory);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}*/

const addPriceCategory = async (req, res) => {
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
}

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