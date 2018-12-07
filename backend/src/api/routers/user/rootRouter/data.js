export const data = (req, res) => {
    let body = (({first, last, email, pendingEmail, image}) =>
        ({first, last, email, pendingEmail, image}))(req.user);

    body.user_id  = req.user._id;
    body.intra    = req.user.intraId !== null;
    body.github   = req.user.githubId !== null;
    body.password = req.user.password !== null;
    res.status(200).json({
        "success": true,
        ...body
    })
};
