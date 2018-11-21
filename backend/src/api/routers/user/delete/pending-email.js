const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

export const pendingEmail = model => (req, res, next) => {
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return successFalse(res, 'Invalid token');
            }
            if (user.pendingEmail === null) {
                return successFalse(res, 'No pending email');
            }
            user.pendingEmail = null;
            user.activationToken = null;
            user.save()
                .then(() => res.status(201).json({"success": true}))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
