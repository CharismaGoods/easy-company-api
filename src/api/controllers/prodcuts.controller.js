const { replaceUndefined } = require('../helpers/utilities');
const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const { name } = req.query;

    try {
        let products = await Product.getProducts(name);

        if (products === null) {
            res.status(404).json({});
        }
        else if (products.length == 1) {
            res.json(products[0]);
        }
        else if (products.length > 1) {
            res.json(products)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { getProducts };