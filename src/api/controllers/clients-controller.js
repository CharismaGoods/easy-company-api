//const res = require('express/lib/response');
//const { executeCommand } = require('../helpers/db');
const { replaceUndefined } = require('../helpers/utilities');
const Client = require('../models/Client');

const getClients = async (req, res) => {
    const { full_name } = req.query;

    try {
        let clients = await Client.getClients(full_name);

        if (clients === null) {
            res.status(404).json({});
        }
        else if (clients.length == 1) {
            res.json(clients[0]);
        }
        else if (clients.length > 1) {
            res.json(clients)
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

const getClientById = async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            let client = await Client.getClientById(id);
            if (client === null) {
                res.status(404).json({});
            }
            else {
                res.json(client);
            }
        }
        else {
            res.status(404).json({});
        }
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}


const addClient = async (req, res) => {
    let { full_name, email,
        website, tel,
        mobile,
        note, street, house_no,
        city, country, zip,
        company_name, vat_no,
        is_wholesaler, kind } = req.body;

    try {
        //check if is_wholesaler is a number or not.
        if (isNaN(is_wholesaler)) {
            res.status(422).json({ success: 'no', msg: 'is_wholesaler should be 1 or 0.' });
            return;
        }

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

            //replace 'undefined' with empty standard-string.
            full_name = replaceUndefined(full_name);
            email = replaceUndefined(email);
            website = replaceUndefined(website);
            tel = replaceUndefined(tel);
            mobile = replaceUndefined(mobile);
            note = replaceUndefined(note);
            street = replaceUndefined(street);
            house_no = replaceUndefined(house_no);
            city = replaceUndefined(city);
            country = replaceUndefined(country);
            zip = replaceUndefined(zip);
            company_name = replaceUndefined(company_name);
            vat_no = replaceUndefined(vat_no);
            kind = replaceUndefined(kind);

            let result = await Client.addClient(full_name, email,
                website, tel,
                mobile, note,
                street, house_no,
                city, country,
                zip, company_name,
                vat_no, is_wholesaler,
                kind);

            if (result) {
                res.json({ success: 'yes', id: result });
            }
            else {
                res.status(500).json({ success: 'no', msg: 'Error has occured when insert' });
            }
        }
        else {
            res.status(422).json({ success: 'no', msg: 'missing fields: full_name and/or is_wholesaler' });
        }
    }
    catch (err) {

    }
}


const updateClient = async (req, res) => {
    let { id, full_name, email,
        website, tel,
        mobile,
        note, street, house_no,
        city, country, zip,
        company_name, vat_no,
        is_wholesaler, kind } = req.body;

    //check if is_wholesaler is a number or not.
    if (isNaN(is_wholesaler)) {
        res.status(400).json({ success: 'no', msg: 'is_wholesaler should be 1 or 0.' });
        return;
    }

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

        //replace 'undefined' with empty standard-string.
        full_name = replaceUndefined(full_name);
        email = replaceUndefined(email);
        website = replaceUndefined(website);
        tel = replaceUndefined(tel);
        mobile = replaceUndefined(mobile);
        note = replaceUndefined(note);
        street = replaceUndefined(street);
        house_no = replaceUndefined(house_no);
        city = replaceUndefined(city);
        country = replaceUndefined(country);
        zip = replaceUndefined(zip);
        company_name = replaceUndefined(company_name);
        vat_no = replaceUndefined(vat_no);
        kind = replaceUndefined(kind);

        let result = await Client.updateClient(id, full_name, email,
            website, tel,
            mobile, note,
            street, house_no,
            city, country,
            zip, company_name,
            vat_no, is_wholesaler,
            kind);

        if (result) {
            res.json({ success: 'yes', id: result });
        }
        else {
            res.status(500).json({ success: 'no', msg: 'Error has occured when update' });
        }
    }
    else {
        res.status(422).json({ success: 'no', msg: 'missing fields: full_name and/or is_wholesaler' });
    }
}

module.exports = { getClients, getClientById, addClient, updateClient };