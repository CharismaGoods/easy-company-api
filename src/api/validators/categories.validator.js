const validateAddCategory = (req, res, next) => {
    let { name, parent_id } = req.body;

    try {
        if (typeof name === "undefined") {
            res.status(422).json({ success: 'no', msg: 'name field is missing' });
            return;
        }

        if (name === '' || name === null) {
            res.status(422).json({ success: 'no', msg: 'name field is empty' });
            return;
        }

        if (typeof parent_id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'parent_id field is missing' });
            return;
        }

        if (parent_id === '' || `${parent_id}`.toLocaleLowerCase() === 'null') {
            parent_id = null;
        }

        req.category = {name: name, parent_id: parent_id};
    
        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}


const validateUpdateCategory = (req, res, next) => {
    let { id, name, parent_id } = req.body;

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

        if (typeof parent_id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'parent_id field is missing' });
            return;
        }

        if (parent_id === '' || `${parent_id}`.toLocaleLowerCase() === 'null') {
            parent_id = null;
        }

        req.category = {id: id, name: name, parent_id: parent_id};
    
        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = {validateUpdateCategory, validateAddCategory};