const res = require('express/lib/response');
const pool = require('../helpers/db');
const { replaceUndefined } = require('../helpers/utilities');

const executeCommand = async (sql, kind, cb) => {
    try {
        pool.getConnection(function (err, conn) {
            if (err) {
                if (err.errno) {
                    conn.release();
                    cb({ success: 'no', msg: `${err.errno - err.sqlMessage}` });
                }
                else {
                    conn.release();
                    cb({ success: 'no', msg: `${err}` });
                }
            }
            else {
                conn.query(sql, function (err, results) {
                    if (err) {
                        if (err.errno) {
                            conn.release();
                            cb({ success: 'no', msg: `${err.errno - err.sqlMessage}` });
                        }
                        else {
                            conn.release();
                            cb({ success: 'no', msg: `${err}` });
                        }
                    }
                    else {
                        if (kind === 'insert') {
                            conn.release();
                            cb({ success: 'yes', id: results.insertId });
                        }
                        else if (kind === 'update') {
                            conn.release();
                            cb({ success: 'no', msg: 'not implemented yet.' });
                        }
                        else {
                            conn.release();
                            if(results.length == 1){
                                cb({ success: 'yes', data: results[0] });
                            }
                            else if(results.length > 1){
                                cb({ success: 'yes', data: results });
                            }
                            else{
                                cb({ success: 'no', msg: 'not found' });
                            }
                        }

                    }
                })
            }
        })
    }
    catch (err) {
        cb({ success: 'no', msg: err });
    }
}

const getClients = async (req, res) => {
    const { full_name } = req.query;
    let sql = '';

    if (full_name) {
        sql = `SELECT * 
                FROM clients 
                WHERE full_name LIKE '%${full_name}%'
                ORDER BY 'full_name';`;
    }
    else {
        sql = `SELECT * 
                FROM clients`;
    }

    await executeCommand(sql, 'select', (result) => {
        res.json(result);
    });
}

const getClientById = async (req, res) => {
    const id = req.params.id;

    if (id) {
        const sql = `SELECT * 
                        FROM clients 
                        WHERE id = ${id}`;

        await executeCommand(sql, 'select', (result) => {
            res.json(result);
        });
    }
    else {
        res.Status(404).json({});
    }
}


const addClient = async (req, res) => {
    let { full_name, email,
        website, tel1,
        tel2, mobile,
        notes, street,
        city, country,
        company_name, vat_no,
        is_wholesaler } = req.body;

    if ((full_name && is_wholesaler) || is_wholesaler === 0) {
        if (is_wholesaler === true ||
            is_wholesaler === "true" ||
            is_wholesaler === "1" ||
            is_wholesaler === 1) {
            is_wholesaler = 1;
        }
        else {
            is_wholesaler = 0;
        }

        //replace 'undefined' with empty string.
        email = replaceUndefined(email);
        website = replaceUndefined(website);
        tel1 = replaceUndefined(tel1);
        tel2 = replaceUndefined(tel2);
        mobile = replaceUndefined(mobile);
        notes = replaceUndefined(notes);
        street = replaceUndefined(street);
        city = replaceUndefined(city);
        country = replaceUndefined(country);
        company_name = replaceUndefined(company_name);
        vat_no = replaceUndefined(vat_no);

        const sql = `INSERT INTO clients(full_name, email, 
                                                        website, tel1, 
                                                        tel2, mobile, 
                                                        notes, street, 
                                                        city, country, 
                                                        company_name, vat_no,
                                                        is_wholesaler)
                            VALUES ('${full_name}','${email}',
                                        '${website}','${tel1}',
                                        '${tel2}','${mobile}',
                                        '${notes}','${street}',
                                        '${city}','${country}',
                                        '${company_name}','${vat_no}',
                                        ${is_wholesaler})`;

        await executeCommand(sql, 'insert', (result) => {
            res.json(result);
        });
    }
    else {
        res.json({ success: 'no', msg: 'missing fields: full_name and/or is_wholesaler' });
    }
}


const updateClient = async (req, res) => {

}

module.exports = { getClients, getClientById, addClient };