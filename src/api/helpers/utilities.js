function replaceUndefined(v){
    return typeof v === "undefined" ? "" : v;
}

function flatObject(obj) {
    const fields = Object.getOwnPropertyNames(obj);
    return fields.map(f => ({field: f, value:obj[f]}));
}

module.exports = {replaceUndefined, flatObject};