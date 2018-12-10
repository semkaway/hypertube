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
        return res.status(200).json({"success": false, "message": 'Invalid token'});
    }
    const config = req.app.get('config');
    const crypt  = new Cryptr(config.secrets.crypt);
    const email  = crypt.decrypt(token);
    model.findOne({'email': email})
        .then(user => {
            if (user === null || token !== user.resetPasswordToken) {
                return res.status(200).json({"success": false, "message": 'Invalid token'});
            }
            if (valid.password(password) === false) {
                return res.status(200).json({"success": false, "message": 'Invalid password'});
            }
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            user.resetPasswordToken = null;
            user.save().then(() => res.status(201).json({"success": true}))
                .catch(next);
        })
        .catch(next);
};
