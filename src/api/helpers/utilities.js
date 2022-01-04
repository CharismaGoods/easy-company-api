function replaceUndefined(v){
    return typeof v === "undefined" ? "" : v;
}

module.exports = {replaceUndefined};