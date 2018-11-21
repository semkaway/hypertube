import {valid} from "../models";
import bcrypt from "bcrypt";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

export const password = model => (req, res, next) => {
    if (req.body.password === undefined) {
        throw new Error("Require 'password' field");
    }
    if (valid.password(req.body.password) === false) {
        return successFalse(res, 'Invalid password');
    }

    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return successFalse(res, 'Invalid token');
            }
            if (user.password !== null) {
                throw new Error("Can't add password");
            }
            user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

            user.save().then(() => res.status(201).json({"success": true}))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
