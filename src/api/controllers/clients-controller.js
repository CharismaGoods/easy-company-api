const mysql = require('mysql');
const dbConnection = require('../helpers/db');
const { replaceUndefined } = require('../helpers/utilities');

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

    try {
        await dbConnection.query(sql, (err, results, fields) => {
            if (err) {
                res.json({ success: 'no', msg: `${err.errno - err.sqlMessage}` });
            }
            else {
                res.send(results);
            }
        });
    }
    catch (err) {
        res.json({ success: 'no', msg: `MySQL - Internal Error` });
    }
}

const getClientById = async (req, res) => {
    const id = req.params.id;

    if (id) {
        const sql = `SELECT * 
                        FROM clients 
                        WHERE id = ${id}`;

        try {
            await dbConnection.query(sql, (err, results, fields) => {
                if (err) {
                    res.json({ success: 'no', msg: `${err.errno - err.sqlMessage}` });
                }
                else {
                    res.send(results);
                }
            });
        }
        catch (err) {
            res.json({ success: 'no', msg: `MySQL - Internal Error` });
        }
    }
    else {
        res.sendStatus(404);
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

        try {
            await dbConnection.query(sql, (err, results, fields) => {
                if (err) {
                    //if errno === 1062 this means a duplication entry is happened.
                    if (err.errno === 1062) {
                        res.json({ success: 'no', msg: `${err.errno} - ${err.sqlMessage}` });
                    }
                    else {
                        res.json({ success: 'no', msg: err });
                    }

                }
                else {
                    res.json({ success: 'yes', id: results.insertId });
                }
            });
        }
        catch (err) {
            res.json({ success: 'no', msg: `MySQL - Internal Error` });
        }
    }
    else {
        res.json({ success: 'no', msg: 'missing fields: full_name and/or is_wholesaler' });
    }
}


const updateClient = async (req, res) => {

}

module.exports = { getClients, getClientById, addClient };