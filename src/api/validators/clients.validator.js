const { replaceUndefined } = require('../helpers/utilities');

const validateAddClient = (req, res, next) => {
    let { full_name, email,
        website, tel,
        mobile,
        note, street, house_no,
        city, country, zip,
        company_name, vat_no,
        is_wholesaler, kind } = req.body;

    try {
        if (typeof is_wholesaler === "undefined") {
            res.status(422).json({ success: 'no', msg: 'is_wholesaler field is missed' });
            return;
        }

        if (isNaN(is_wholesaler)) {
            res.status(422).json({ success: 'no', msg: 'is_wholesaler field should be a number: 1 or 0 only' });
            return;
        }
        else {
            if (!(is_wholesaler === 1 || is_wholesaler === 0)) {
                res.status(422).json({ success: 'no', msg: 'is_wholesaler field should be a number: 1 or 0 only' });
                return;
            }
        }

        if (typeof full_name === "undefined") {
            res.status(422).json({ success: 'no', msg: 'full_name field is missed' });
            return;
        }


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


        req.client = {
            id: null, full_name: full_name, email: email,
            website: website, tel: tel,
            mobile: mobile, note: note,
            street: street, house_no: house_no,
            city: city, country: country,
            zip: zip, company_name: company_name,
            vat_no: vat_no, is_wholesaler: is_wholesaler,
            kind: kind
        };

        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}


const validateUpdateClient = (req, res, next) => {
    let { id, full_name, email,
        website, tel,
        mobile,
        note, street, house_no,
        city, country, zip,
        company_name, vat_no,
        is_wholesaler, kind } = req.body;

    try {
        if (typeof id === "undefined") {
            res.status(422).json({ success: 'no', msg: 'id field is missed' });
            return;
        }

        if (typeof is_wholesaler === "undefined") {
            res.status(422).json({ success: 'no', msg: 'is_wholesaler field is missed' });
            return;
        }

        if (isNaN(is_wholesaler)) {
            res.status(422).json({ success: 'no', msg: 'is_wholesaler field should be a number: 1 or 0 only' });
            return;
        }
        else {
            if (!(is_wholesaler === 1 || is_wholesaler === 0)) {
                res.status(422).json({ success: 'no', msg: 'is_wholesaler field should be a number: 1 or 0 only' });
                return;
            }
        }

        if (typeof full_name === "undefined") {
            res.status(422).json({ success: 'no', msg: 'full_name field is missed' });
            return;
        }


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


        req.client = {
            id: id, full_name: full_name, email: email,
            website: website, tel: tel,
            mobile: mobile, note: note,
            street: street, house_no: house_no,
            city: city, country: country,
            zip: zip, company_name: company_name,
            vat_no: vat_no, is_wholesaler: is_wholesaler,
            kind: kind
        };

        next();
    }
    catch (err) {
        res.status(500).json({ success: 'no', msg: err });
    }
}

module.exports = { validateUpdateClient, validateAddClient };