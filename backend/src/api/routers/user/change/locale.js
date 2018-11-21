import {valid} from "../models";

export const locale = model => (req, res, next) => {
    if (req.body.locale === undefined) {
        throw new Error("Require 'locale' field");
    }
    if (valid.locale(req.body.locale) === false) {
        return res.status(200).json({"success": false, "message": 'Invalid locale'});
    }
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return res.status(200).json({"success": false, "message": 'Invalid token'});
            }
            user.locale = req.body.locale;
            user.save().then(() => res.status(201).json({"success": true}))
                .catch(error => next(error));
        })
        .catch(error => next(error));

};
