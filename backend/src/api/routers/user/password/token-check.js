import {checkForUndefined, errorFields} from "../models";

export const tokenCheck = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.body.email, token: req.body.token
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.findOne({email: req.body.email})
        .then(found => {
            if (found === null ||
                found.resetPasswordToken !== req.body.token) {
                res.status(200).json({
                    "success": false,
                    "message": `Invalid ${found ? 'token' : 'email'}`
                });
            } else {
                res.status(200).json({"success": true});
            }
        })
        .catch(error => next(error));
};
