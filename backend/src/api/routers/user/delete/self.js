export const self = model => (req, res, next) => {
    model.findById(req.id)
        .then(user => {
            user.email = null;
            user.pendingEmail = null;
            user.password = null;
            user.intraId = null;
            user.githubId = null;
            user.activated = false;
            user.activationToken = null;
            user.resetPasswordToken = null;
            user.comments = null;
            user.save()
                .then(() => res.status(201).json({"success": true}))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
