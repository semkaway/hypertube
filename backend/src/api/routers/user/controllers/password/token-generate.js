export const tokenGenerate = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    model.where({email: req.body.email}).findOne()
        .then(found => res.status(200).json({"exist": found !== null}))
        .catch(error => next(error));
};
