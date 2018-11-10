import * as EmailValidator from 'email-validator'
import validator from 'password-validator'

const checkForUndefined = body => {
    let fields = [];
    for (let [field, value] of Object.entries(body)) {
        if (value === undefined || value === '') {
            fields.push(`'${field}'`);
        }
    }
    return fields;
};

const validateFields = body => {
    let fields  = [];
    const valid = {
        email: mail => EmailValidator.validate(mail),
        password: pass => new validator()
            .is().min(8)
            .is().max(20)
            .has().uppercase()
            .has().lowercase()
            .has().digits().validate(pass),
        first: name => new validator()
            .is().min(3)
            .is().max(15).validate(name),
        last: name => new validator()
            .is().min(3)
            .is().max(15).validate(name)
    };

    for (let [field, value] of Object.entries(body)) {
        if (valid[field](value) === false) {
            fields.push(`'${field}'`);
        }
    }

    return fields;
};

const errorFields = (error, fields) => {
    if (fields.length === 1) {
        return `${error} field ${fields[0]}`;
    }
    return `${error} fields ${fields.join(' ')}`;
};

const validateBody = (body) => {
    let missingFields = checkForUndefined(body);
    if (missingFields.length !== 0) {
        return errorFields('Missing', missingFields);
    }
    let invalidFields = validateFields(body);
    if (invalidFields.length !== 0) {
        return errorFields('Invalid', invalidFields);
    }
    return '';
};

export const beforeSaveValidation = (req, res, next) => {
    let {email, password, first, last} = req.body;

    let body = {email, password, first, last};

    let errorMessage = validateBody(body);

    if (errorMessage !== '') {
        res.status(200).json({
            "success": false,
            "message": errorMessage
        });
    }
    req.body = body;
    next();
};
