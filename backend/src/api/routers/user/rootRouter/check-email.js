export const checkEmail = model => (req, res, next) => {
    model.findOne({
        $or: [
            {'email': req.params.email},
            {'pendingEmail': req.params.email}
        ]
    })
        .then(user => res.status(200).json({"exist": user !== null}))
        .catch(next);
};
