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

async function addEntity(res, repository, entity, error_msgs) {
    try {
        let result = await repository.add(entity);

        if (result) {
            res.status(201).json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when insert' });
        }
    }
    catch (err) {
        addUpdateErrorManipulation(res, err, error_msgs);
    }
}

async function updateEntity(res, repository, entity, error_msgs) {
    try {
        let result = await repository.update(entity);

        if (result) {
            res.status(201).json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when update' });
        }
    }
    catch (err) {
        addUpdateErrorManipulation(res, err, error_msgs);
    }
}

async function addUpdateErrorManipulation(res, errObj, error_msgs) {
    let err_msg = '';
    
    if (errObj.errno) {
        if (errObj.errno === 1452) {
            //Forign-key violation
            err_msg = error_msgs["1452"]
        }
        else if (errObj.errno === 1062) {
            //value duplication
            err_msg = error_msgs["1062"]
        }
        else {
            err_msg = errObj.sqlMessage;
        }
    }
    else {
        err_msg = errObj.sqlMessage;
    }

    res.status(500).json({ success: 'no', msg: err_msg });
}

module.exports = {
    replaceUndefined,
    flatObject,
    getEntityById,
    getEntities,
    addEntity,
    updateEntity
};