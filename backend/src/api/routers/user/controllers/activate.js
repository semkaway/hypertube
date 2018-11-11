import {checkForUndefined, errorFields} from "../models";

export const activateUser = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.body.email, token: req.body.token
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.where({email: req.body.email}).findOne()
        .then(found => {
            if (found === null) {
                res.status(200).json({
                    "success": false,
                    "message": "Invalid email"
                });
            } else if (found.activationToken === req.body.token) {
                found.activation      = true;
                found.activationToken = null;
                found.save()
                    .then(() => res.status(200).json({
                        "success": true,
                        "message": "User activated"
                    }))
                    .catch(error => next(error));
            } else {
                res.status(200).json({
                    "success": false,
                    "message": "Invalid token"
                });
            }
        })
        .catch(error => next(error));
};
