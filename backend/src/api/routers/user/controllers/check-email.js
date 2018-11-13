export const checkEmail = model => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.query.email === undefined) {
        throw new Error("Require 'email' param");
    }
    model.where({email: req.query.email}).findOne()
        .then(found => res.status(200).json({"exist": found !== null}))
        .catch(error => next(error));
};
