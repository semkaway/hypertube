import {checkForUndefined, errorFields} from "../../models";

export const change = model => (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        email: req.query.email, token: req.query.token
    }));
    if (error !== '') {
        throw new Error(error);
    }
    model.where({email: req.query.email}).findOne()
        .then(found => {
            res.status(200).json({"exist": found !== null});
        })
        .catch(error => next(error));
};
