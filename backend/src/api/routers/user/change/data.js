import {valid} from "../models";
import bcrypt from "bcrypt";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

const checkForInvalid = ({first, last, oldPassword, newPassword}) => {
    if (first === undefined && last === undefined &&
        oldPassword === undefined && newPassword === undefined) {
        throw new Error("Require one of 'first' or 'last' or 'oldPassword' and 'newPassword' fields");
    }

    if ((oldPassword !== undefined && newPassword === undefined) ||
        (newPassword !== undefined && oldPassword === undefined)) {
        throw new Error("Require both 'oldPassword' and 'newPassword' fields");
    }

    let invalid = [];
    if (first !== undefined && valid.first(first) === false) {
        invalid.push('first');
    }
    if (last !== undefined && valid.last(last) === false) {
        invalid.push('last');
    }
    if (newPassword !== undefined && valid.password(newPassword) === false) {
        invalid.push('newPassword');
    }
    return invalid;
};

export const data = (req, res, next) => {
    let {first, last, oldPassword, newPassword} = req.body;

    const invalid = checkForInvalid(req.body);
    if (invalid.length !== 0) {
        return successFalse(res, `Invalid ${invalid.join(' ')}`)
    }
    if (oldPassword !== undefined &&
        bcrypt.compareSync(oldPassword, req.user.password) === false) {
        return successFalse(res, 'Invalid oldPassword');
    }
    if (newPassword !== undefined) {
        req.user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    }
    req.user.first = first !== undefined ? first : req.user.first;
    req.user.last  = last !== undefined ? last : req.user.last;
    req.user.save()
        .then(() => res.status(200).json({"success": true}))
        .catch(error => next(error));
};
