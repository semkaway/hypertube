import {valid} from "../models";
import bcrypt from "bcrypt";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

export const password = (req, res, next) => {
    if (req.body.password === undefined) {
        throw new Error("Require 'password' field");
    }
    if (valid.password(req.body.password) === false) {
        return successFalse(res, 'Invalid password');
    }
    if (req.user.password !== null) {
        throw new Error("Can't add password");
    }
    req.user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.user.save()
        .then(() => res.status(201).json({"success": true}))
        .catch(error => next(error));
};
