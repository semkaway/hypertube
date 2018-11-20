import {checkForUndefined, errorFields} from "../models";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

export const login = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.body.email, password: req.body.password
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.findOne({email: req.body.email})
        .then(user => {
            if (user === null) {
                successFalse(res, 'Invalid email');
            } else {
                if (user.activated === false) {
                    successFalse(res, 'User not activated');
                } else if (user.password === null ||
                    bcrypt.compareSync(req.body.password, user.password) === false) {
                    successFalse(res, 'Invalid password');
                } else {
                    let secret = req.app.get('config').secrets.jwt;
                    res.status(200).json({
                        "success": true,
                        "token": jwt.sign({id: user._id}, secret),
                        "locale": user.locale
                    });
                }
            }
        })
        .catch(error => next(error));
};
