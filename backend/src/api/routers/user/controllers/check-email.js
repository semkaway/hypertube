export const checkEmail = model => (req, res, next) => {
    model.findOne({email: req.params.email})
        .then(found => res.status(200).json({"exist": found !== null}))
        .catch(error => next(error));
};
