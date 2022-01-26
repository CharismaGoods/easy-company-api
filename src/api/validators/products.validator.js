const { replaceUndefined } = require('../helpers/utilities');

const validateAddProduct = (req, res, next) => {
    let { category_id, name,
        brand, sku,
        measurement_unit, net_weight,
        gross_weight, ar_description,
        en_description, de_description,
        thumbnail } = req.body;
    try {
        if (typeof name === "undefined") {
            res.status(422).json({ success: 'no', msg: 'name field is missing' });
            return;
        }

        if (name === '' || name === null) {
            res.status(422).json({ success: 'no', msg: 'name field is empty' });
            return;
        }

        if (typeof category_id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'category_id field is missing' });
            return;
        }

        //the category_id could be null, because the relation between
        // categories table and products table is one-zero to many-zero.
        if (category_id === '' || `${category_id}`.toLocaleLowerCase() === 'null') {
            category_id = null;
        }

        //replace 'undefined' with empty standard-string.
        brand = replaceUndefined(brand);
        sku = replaceUndefined(sku);
        measurement_unit = replaceUndefined(measurement_unit);
        net_weight = replaceUndefined(net_weight);
        gross_weight = replaceUndefined(gross_weight);
        ar_description = replaceUndefined(ar_description);
        en_description = replaceUndefined(en_description);
        de_description = replaceUndefined(de_description);
        thumbnail = replaceUndefined(thumbnail);

        req.product = {
            category_id, name,
            brand, sku,
            measurement_unit, net_weight,
            gross_weight, ar_description,
            en_description, de_description,
            thumbnail
        };

        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}


const validateUpdateProduct = (req, res, next) => {
    let { id, category_id, name,
        brand, sku,
        measurement_unit, net_weight,
        gross_weight, ar_description,
        en_description, de_description,
        thumbnail } = req.body;

    try {
        if (typeof id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'id field is missing' });
            return;
        }

        if (typeof name === "undefined") {
            res.status(422).json({ success: 'no', msg: 'name field is missing' });
            return;
        }

        if (name === '' || name === null) {
            res.status(422).json({ success: 'no', msg: 'name field is empty' });
            return;
        }

        if (typeof category_id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'category_id field is missing' });
            return;
        }

        //the category_id could be null, because the relation between
        // categories table and products table is one-zero to many-zero.
        if (category_id === '' || `${category_id}`.toLocaleLowerCase() === 'null') {
            category_id = null;
        }

        //replace 'undefined' with empty standard-string.
        brand = replaceUndefined(brand);
        sku = replaceUndefined(sku);
        measurement_unit = replaceUndefined(measurement_unit);
        net_weight = replaceUndefined(net_weight);
        gross_weight = replaceUndefined(gross_weight);
        ar_description = replaceUndefined(ar_description);
        en_description = replaceUndefined(en_description);
        de_description = replaceUndefined(de_description);
        thumbnail = replaceUndefined(thumbnail);

        req.product = {
            id,
            category_id, name,
            brand, sku,
            measurement_unit, net_weight,
            gross_weight, ar_description,
            en_description, de_description,
            thumbnail
        };

        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { validateAddProduct, validateUpdateProduct };