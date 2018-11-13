import {checkForUndefined, errorFields} from "../models";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

export const login = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.body.email, password: req.body.password
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.findOne({email: req.body.email})
        .then(user => {
            if (user === null || user.activation === false ||
                bcrypt.compareSync(req.body.password, user.password) === false) {
                res.status(200).json({
                    "success": false,
                    "message": user === null ? 'Invalid email' :
                        (user.activation ? 'Invalid password' : 'User not activated')
                });
            } else {
                res.status(200).json({
                    "success": true,
                    "token": jwt.sign({id: user._id}, 'bw5Neu7c'),
                    "locale": user.locale
                });
            }
        })
        .catch(error => next(error));
};
