export const self = model => (req, res, next) => {
    model.findByIdAndRemove(req.id)
        .then(() => res.status(201).json({"success": true}))
        .catch(error => next(error));
};
