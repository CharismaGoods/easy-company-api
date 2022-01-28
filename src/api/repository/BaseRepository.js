const pool = require('../helpers/mysql');

class BaseRepository {
    static customFind = async (sTable, sColumn, value) => {
        let sql = '';
        let values = [];

        try {
            if (value) {
                if (isNaN(value)) {
                    sql = `SELECT * FROM ${sTable}
                        WHERE ${sColumn} LIKE ?`;
                    values.push(`%${value}%`);
                }
                else {
                    sql = `SELECT * FROM ${sTable}
                        WHERE ${sColumn} = ?`;
                     values.push(`${value}`);
                }
            } else {
                return [];
            }

            let results = await pool.query(sql, values);

            return results;
        } catch (err) {
            throw err;
        }
    }

    static find = async (sTable, sColumn, sName) => {
        let sql = '';
        let values = [];

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

            return results;
        } catch (err) {
            throw err;
        }
    }

    static getById = async (sTable, sColumn, id) => {
        let sql = '';
        let values = [];

        try {
            sql = `SELECT * FROM ${sTable} WHERE ${sColumn} =?`;
            values = [id];

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

    static add = async (sTable, arrColumnsValues) => {
        const fields = arrColumnsValues
            .filter(entry => entry.field !== 'id')
            .map(entry => entry.field).join(',');
        const values = arrColumnsValues
            .filter(entry => entry.field !== 'id')
            .map(entry => entry.value);

        const question_marks = values.map(entry => '?').join(',');
        const sql = `INSERT INTO ${sTable}(${fields}) VALUES(${question_marks})`;

        try {
            let result = await pool.query(sql, values);

            if (result.affectedRows == 1) {                
                return result.insertId;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static update = async (sTable, arrColumnsValues) => {
        const id = arrColumnsValues.find(entry => entry.field === 'id')['value'];

        let values = arrColumnsValues
            .filter(entry => entry.field !== 'id')
            .map(entry => entry.value);

        //make sure the 'id' field value is the last one.
        values.push(id);

        const dualities = arrColumnsValues
            .filter(entry => entry.field !== 'id')
            .map(entry => `${entry.field} = ?`).join(',');

        const sql = `UPDATE ${sTable} SET ${dualities} WHERE id = ?`;

        try {
            let result = await pool.query(sql, values);
            if (result.affectedRows == 1) {
                return id;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static del = async(sTable, sColumn, id ) => {
        let sql = '';
        let values = [];

        try {
            sql = `DELETE FROM ${sTable} WHERE ${sColumn} =?`;
            values = [id];

            console.log(sql)
            let results = await pool.query(sql, values);

            return results.affectedRows;           
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BaseRepository;