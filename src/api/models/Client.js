/**
 * This file containts the model of Client entitiy of EasyCompany inventory system 
 * It contains all required logic for communicating the database.
 *
 * @summary Client Model File
 * @author Husam Burhan
 *
 * Created at     : 2022-01-06 14:16:53 
 * Last modified  : 2022-01-07 08:52:13
 */

const pool = require('../helpers/mysql');

class Client {
    constructor(id, full_name, email,
        website, tel,
        mobile,
        note, street, house_no,
        city, country, zip,
        company_name, vat_no,
        is_wholesaler, kind) {

        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.website = website;
        this.tel = tel;
        this.mobile = mobile;
        this.note = note;
        this.street = street;
        this.house_no = house_no;
        this.city = city;
        this.country = country;
        this.zip = zip;
        this.company_name = company_name;
        this.vat_no = vat_no;
        this.is_wholesaler = is_wholesaler;
        this.kind = kind;
    }

    static getClients = async (full_name) => {
        let sql = '';
        let values = [];

        try {
            if (full_name) {
                sql = `SELECT * 
                        FROM clients 
                        WHERE full_name LIKE ?
                        ORDER BY full_name;`;

                values.push(`%${full_name}%`);
            }
            else {
                sql = `SELECT * 
                        FROM clients`;
            }

            let results = await pool.query(sql, values);

            if (results.length > 0) {
                return results.map(r => new Client(r.id, r.full_name, r.email,
                    r.website, r.tel,
                    r.mobile,
                    r.note, r.street, r.house_no,
                    r.city, r.country, r.zip,
                    r.company_name, r.vat_no,
                    r.is_wholesaler, r.kind));
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }


    static getClientById = async (id) => {
        let sql = '';
        let values = [];

        try {
            const sql = `SELECT * 
                        FROM clients 
                        WHERE id =?`;
            const values = [id];

            let result = await pool.query(sql, values);

            if (result.length == 1) {

                return new Client(result[0].id, result[0].full_name, result[0].email,
                    result[0].website, result[0].tel,
                    result[0].mobile,
                    result[0].note, result[0].street, result[0].house_no,
                    result[0].city, result[0].country, result[0].zip,
                    result[0].company_name, result[0].vat_no,
                    result[0].is_wholesaler, result[0].kind);
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    static addClient = async (full_name, email, website, tel, mobile, note, street, house_no, city, country, zip, company_name, vat_no, is_wholesaler, kind) => {
        const sql = `INSERT INTO clients(full_name, email, 
                                    website, tel, 
                                    mobile, note, street, house_no,
                                    city, country, zip,
                                    company_name, vat_no,
                                    is_wholesaler, kind)
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [full_name, email, website, tel, mobile, note, street, house_no, city, country, zip, company_name, vat_no, is_wholesaler, kind];

        let result = await pool.query(sql, values);        

        if (result.affectedRows == 1) {
            return result.insertId;
        }
        else {
            return null;
        }      
    }

    static updateClient = async (id, full_name, email, website, tel, mobile, note, street, house_no, city, country, zip, company_name, vat_no, is_wholesaler, kind) => {
        const sql = `UPDATE clients 
                        SET full_name = ?,
                            email = ?, 
                            website = ?,
                            tel = ?, 
                            mobile = ?,
                            note = ?,
                            street = ?, 
                            house_no = ?,
                            city = ?,
                            country = ?,
                            zip= ?,
                            company_name = ?,
                            vat_no = ?,
                            is_wholesaler = ?,
                            kind = ?                            
                        WHERE id = ?`;

        const values = [full_name,
            email,
            website,
            tel,
            mobile,
            note,
            street,
            house_no,
            city, country,
            zip,
            company_name,
            vat_no,
            is_wholesaler,
            kind,
            id];

        let result = await pool.query(sql, values);        

        if (result.affectedRows == 1) {
            return id;
        }
        else {
            return null;
        }      
    }
}

module.exports = Client;

