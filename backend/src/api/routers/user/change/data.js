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

export const data = model => (req, res, next) => {
    let {first, last, oldPassword, newPassword} = req.body;

    const invalid = checkForInvalid(req.body);
    if (invalid.length !== 0) {
        return successFalse(res, `Invalid ${invalid.join(' ')}`)
    }
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return successFalse(res, 'Invalid token');
            }
            if (oldPassword !== undefined &&
                bcrypt.compareSync(oldPassword, user.password) === false) {
                return successFalse(res, 'Invalid oldPassword');
            }
            if (newPassword !== undefined) {
                user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
            }
            user.first = first !== undefined ? first : user.first;
            user.last  = last !== undefined ? last : user.last;
            user.save()
                .then(() => res.status(200).json({"success": true}))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
