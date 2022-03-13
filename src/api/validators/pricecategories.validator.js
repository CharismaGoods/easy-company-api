const validateAddPCategory = (req, res, next) => {
    let { name, price } = req.body;

    try {
        if (typeof name === "undefined" || typeof price === "undefined") {
            res.status(422).json({ success: 'no', msg: 'name and/or price fields are missing' });
            return;
        }

        if (name === '' || name === null || price === '' || price === null) {
            res.status(422).json({ success: 'no', msg: 'name and/or fields are empty' });
            return;
        }

        req.pcategory = {name: name, price: price};
    
        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}


const validateUpdatePCategory = (req, res, next) => {
    let { id, name } = req.body;

    try {
        if (typeof id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'id field is missing' });
            return;
        }

        if (id === '' || id === null) {
            res.status(422).json({ success: 'no', msg: 'id field is empty' });
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

        req.pcategory = {id: id, name: name};
    
        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = {validateUpdatePCategory, validateAddPCategory};