import {valid} from "../models";

export const locale = (req, res, next) => {
    if (req.body.locale === undefined) {
        throw new Error("Require 'locale' field");
    }
    if (valid.locale(req.body.locale) === false) {
        return res.status(200).json({"success": false, "message": 'Invalid locale'});
    }
    req.user.locale = req.body.locale;
    req.user.save()
        .then(() => res.status(201).json({"success": true}))
        .catch(next);
};
