import * as EmailValidator from 'email-validator'
import validator from 'password-validator'

export const checkForUndefined = body => {
    let fields = [];
    for (let [field, value] of Object.entries(body)) {
        if (value === undefined || value === '') {
            fields.push(`'${field}'`);
        }
    }
    return fields;
};

const validateUserFields = body => {
    let fields = [],
        valid  = {
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

export const errorFields = (error, fields) => {
    if (fields.length === 0) {
        return '';
    }
    if (fields.length === 1) {
        return `${error} field ${fields[0]}`;
    }
    return `${error} fields ${fields.join(' ')}`;
};

export const beforeUserSave = (req, res, next) => {
    let {email, password, first, last} = req.body;

    req.body = {email, password, first, last};

    for (let error of [
        errorFields('Missing', checkForUndefined(req.body)),
        errorFields('Invalid', validateUserFields(req.body))
    ]) {
        if (error !== '') {
            res.status(200).json({
                "success": false,
                "message": error
            });
        }
    }
    next();
};
