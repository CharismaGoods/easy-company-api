const pool = require('../helpers/mysql');

const getElements = async (sTable, sColumn, sName) => {
    let sql = '',
    values = [];

    try {
        if (sName) {
            sql = `SELECT * FROM ${sTable}
                WHERE ${sColumn} LIKE ?
                ORDER BY ${sColumn};`;
            values.push(`%${sName}%`);                
        } else {
            sql = `SELECT * FROM ${sTable}`;
        }
        let results = await pool.query(sql, values);
        if (results.length > 0) {
            return results;
        } else {
            return null;
        }
    } catch (err) {            
        throw err;
    }
}

const getElementById = async (sTable, sColumn, id, sColumn2, id2) => {
    let sql = '',
    values = [];
    try {
        if (id2) {
            sql = `SELECT * FROM ${sTable} WHERE ${sColumn} =? AND ${sColumn2} =id2`,
            values = [id, id2];
        } else {
            sql = `SELECT * FROM ${sTable} WHERE ${sColumn} =?`,
            values = [id];
        }

        let results = await pool.query(sql, values);
        if (results.length == 1) {
            return results[0];
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}

module.exports = { getElements, getElementById };