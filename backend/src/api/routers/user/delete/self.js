export const self = (req, res, next) => {
    req.user.email              = null;
    req.user.pendingEmail       = null;
    req.user.password           = null;
    req.user.intraId            = null;
    req.user.githubId           = null;
    req.user.activated          = false;
    req.user.activationToken    = null;
    req.user.resetPasswordToken = null;
    req.user.comments           = null;
    req.user.save()
        .then(() => res.status(201).json({"success": true}))
        .catch(error => next(error));
};
