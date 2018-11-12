import {checkForUndefined, errorFields} from "../../models";

export const tokenCheck = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.query.email, token: req.query.token
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.where({email: req.query.email}).findOne()
        .then(found => {
            if (found === null ||
                found.resetPasswordToken !== req.query.token) {
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
