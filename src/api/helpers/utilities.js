function replaceUndefined(v) {
    return typeof v === "undefined" ? "" : v;
}

function flatObject(obj) {
    const fields = Object.getOwnPropertyNames(obj);
    return fields.map(f => ({ field: f, value: obj[f] }));
}

async function getEntityById(req, res, repository) {
    const id = req.params.id;

    try {
        if (id) {
            let entity = await repository.getById(id);
            if (entity === null) {
                res.status(404).json({});
            }
            else {
                res.json(entity);
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

async function getEntities(req, res, repository) {
    const { name } = req.query;

    try {
        let entities = await repository.find(name);

        if (entities === null) {
            res.status(404).json({});
        }
        else if (entities.length === 1) {
            res.json(entities[0]);
        }
        else if (entities.length > 1) {
            res.json(entities)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { replaceUndefined, flatObject, getEntityById, getEntities };