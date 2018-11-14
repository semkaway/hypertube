import {checkForUndefined, errorFields} from "../models";

export const activateUser = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.body.email, token: req.body.token
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.findOne({email: req.body.email})
        .then(user => {
            if (user === null || user.activationToken !== req.body.token) {
                res.status(200).json({
                    "success": false,
                    "message": `Invalid ${user ? 'token' : 'email'}`
                });
            } else {
                user.activation      = true;
                user.activationToken = null;
                user.save()
                    .then(() => res.status(201).json({
                        "success": true,
                        "message": "User activated"
                    }))
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
};
