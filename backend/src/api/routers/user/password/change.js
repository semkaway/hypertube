import {checkForUndefined, errorFields, valid} from "../models";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";

export const change = model => (req, res, next) => {
    let {token, password} = req.body;

    let error = errorFields('Missing', checkForUndefined({token, password}));
    if (error !== '') {
        throw new Error(error);
    }
    if (token.toString().length < 32) {
        res.status(200).json({"success": false, "message": 'Invalid token'});
    } else {
        const config = req.app.get('config');
        const crypt  = new Cryptr(config.secrets.crypt);
        const email  = crypt.decrypt(token);
        model.findOne({'email': email})
            .then(user => {
                if (user === null || token !== user.resetPasswordToken) {
                    res.status(200).json({"success": false, "message": 'Invalid token'});
                } else if (valid['password'](password) === false) {
                    res.status(200).json({"success": false, "message": 'Invalid password'});
                } else {
                    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                    user.resetPasswordToken = null;
                    user.save().then(() => res.status(201).json({"success": true}))
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    }
};
