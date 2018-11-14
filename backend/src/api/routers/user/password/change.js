import {checkForUndefined, errorFields, valid} from "../models";
import bcrypt from "bcrypt";

export const change = model => (req, res, next) => {
    let {email, token, password} = req.body;

    let error = errorFields('Missing', checkForUndefined({email, token, password}));
    if (error !== '') {
        throw new Error(error);
    }
    model.findOne({email: email})
        .then(user => {
            token = user ? user.resetPasswordToken === token : token;
            if (user === null ||
                valid['password'](password) === false || token === false) {
                res.status(200).json({
                    "success": false,
                    "message": user ? `Invalid ${token ? 'password' : 'token'}` :
                        "User with this email doesn't exist"
                });
            } else {
                user.resetPasswordToken = null;
                user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                user.save()
                    .then(() => res.status(201).json({"success": true}))
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
};
