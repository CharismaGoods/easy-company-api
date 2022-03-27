const { getEntityById, getEntities, addEntity, updateEntity } = require('../helpers/utilities');
const ProductRepository = require('../repository/ProductRepository');

const getProducts = async (req, res) => {
    //return await getEntities(req, res, ProductRepository);
    try{
        result = await ProductRepository.getAll();

        return res.status(200).json(result);
    }
    catch(err){
        res.sendStatus(500);
    }
}

const getProductById = async (req, res) => {
    return await getEntityById(req, res, ProductRepository);
}

const getPriceCategories = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let price_categories = await ProductRepository.getProductPriceCategories(id);

            if (price_categories.length === 0) {
                res.status(404).json([]);
            }
            else {
                res.status(200).json(price_categories);
            }
        }
        else {
            res.status(404).json([]);
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

    return await addEntity(res,
        ProductRepository,
        product,
        { "1062": "The name or sku fields you specified is duplicated" ,
         "1452": "The category you specified is not found" });
}

const updateProduct = async (req, res) => {
    let product = req.product;
    
    return await updateEntity(res,
        ProductRepository,
        product,
        { "1062": "The name or sku fields you specified is duplicated" ,
         "1452": "The category you specified is not found" });
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

const deleteProduct = async(req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let result = await ProductRepository.delete(id);

            if (result) {
                res.json({ success: 'yes', msg: 'product deleted' });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'could not delete this product.' });
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        if(err.errno === 1451){
            res.status(500).json({ success: 'no', msg: 'The specified product has a relation with another enitity(s)' });
        }
        else{
            res.status(500).json({ success: 'no', msg: err.sqlMessage });
        }
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    getPriceCategories,
    /*getPriceCategories,*/
    assignPCategoryToProduct,
    unassignPCategoryFromProduct,
    deleteProduct
};