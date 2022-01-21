const getElements = async (req, res, fn) => {
    const { paramter } = req.query;

    try {
        let elements = await fn(paramter);

        if (elements === null) {
            res.status(404).json({});
        }
        else if (elements.length == 1) {
            res.json(elements[0]);
        }
        else if (elements.length > 1) {
            res.json(elements)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const getElementById = async (req, res, fn) => {
    const id = req.params.id;
    try {
        if (id) {
            let element = await fn(id);
            if (element === null) {
                res.status(404).json({});
            }
            else {
                res.json(element);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { getElements, getElementById };