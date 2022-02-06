function replaceUndefined(v){
    return typeof v === "undefined" ? "" : v;
}

function flatObject(obj) {
    const fields = Object.getOwnPropertyNames(obj);
    return fields.map(f => ({field: f, value:obj[f]}));
}

async function getEntityById(req, res, repository){
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
        //console.log(err)
        res.status(500).json({ success: 'no', msg: err.sqlMessage });
    }
}

module.exports = {replaceUndefined, flatObject, getEntityById};