export const data = model => (req, res, next) => {
    model.findById(req.id)
        .then(user => {
            if (user === null) {
               return res.status(200).json({"success": false, "message": "Invalid token"});
            }
            let body = (({first, last, email, pendingEmail, image}) =>
                ({first, last, email, pendingEmail, image}))(user);

            body.intra  = user.intraId !== null;
            body.github = user.githubId !== null;
            body.password = user.password !== null;
            res.status(200).json({
                "success": true,
                ...body
            })
        })
        .catch(error => next(error));
};
