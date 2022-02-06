const { getEntityById, getEntities } = require('../helpers/utilities');
const ProductRepository = require('../repository/ProductRepository');

const getProducts = async (req, res) => {
    return await getEntities(req, res, ProductRepository);
}

/*const getProducts = async (req, res) => {
    const { name } = req.query;

    try {
        let products = await ProductRepository.find(name);

        if (products === null) {
            res.status(404).json({});
        }
        else if (products.length === 1) {
            res.json(products[0]);
        }
        else if (products.length > 1) {
            res.json(products)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}*/

const getProductById = async (req, res) => {
    return await getEntityById(req, res, ProductRepository);
}

/*const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let product = await ProductRepository.getById(id);
            if (product === null) {
                res.status(404).json({});
            }
            else {
                res.json(product);
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

const getPriceCategoriesOfClient = async (req, res) => {
    const id = req.params.id;
    const client_id = req.params.client_id;

    try {
        if (id) {
            let price_categories_of_client = await ProductRepository.getProductPriceCategoriesOfClient(id, client_id);
            if (price_categories_of_client === null) {
                res.status(404).json({});
            }
            else {
                res.json(price_categories_of_client);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}

const getPriceCategories = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let price_categories = await ProductRepository.getProductPriceCategories(id);

            if (price_categories === null) {
                res.status(404).json({});
            }
            else {
                res.json(price_categories);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}

/**
 * This function will retrieve all products without corresponding stores.
 * @param {*} req 
 * @param {*} res 
 */
const getUnlickedProducts = async (req, res) => {

}

const addProduct = async (req, res) => {
    let product = req.product;

    try {
        let result = await ProductRepository.add(product);

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
            if (err.errno === 1452) {
                //Forign-key violation
                err_msg = 'The category you specified is not found'
            }
            else if (err.errno === 1062) {
                //value duplication
                err_msg = 'The name or sku fields you specified is duplicated'
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

const updateProduct = async (req, res) => {
    let product = req.product;

    try {
        let result = await ProductRepository.update(product);

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

const assignPCategoryToProduct = async (req, res) => {
    const id = req.params.id;
    const pcategory_id = req.params.pcategory_id;
   
    try {
        if (id && pcategory_id) {
            let result = await ProductRepository.assignPCategory(id, pcategory_id);

            if (result || result === 0) {
                res.json({ success: 'yes', msg: 'assignment succeeded' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not assign this product to the specified price category.' });
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}

const unassignPCategoryFromProduct = async (req, res) => {
    const id = req.params.id;
    const pcategory_id = req.params.pcategory_id;
   
    try {
        if (id && pcategory_id) {
            let result = await ProductRepository.unassignPCategory(id, pcategory_id);

            if (result) {
                res.json({ success: 'yes', msg: 'unassignment succeeded' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not unassing this product from the specified price category.' });
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    getPriceCategories,
    getPriceCategoriesOfClient,
    assignPCategoryToProduct,
    unassignPCategoryFromProduct
};