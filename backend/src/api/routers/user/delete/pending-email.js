export const pendingEmail = (req, res, next) => {
    if (req.user.pendingEmail === null) {
        return res.status(200).json({"success": false, "message": 'No pending email'});
    }
    req.user.pendingEmail    = null;
    req.user.activationToken = null;
    req.user.save()
        .then(() => res.status(201).json({"success": true}))
        .catch(next);
};
