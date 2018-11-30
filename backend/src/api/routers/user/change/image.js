export const image = (req, res, next) => {
    if (req.body.image === undefined) {
        throw new Error("Require 'image' field");
    }
    req.user.image = req.body.image;
    req.user.save().then(() => res.status(201).json({"success": true}))
        .catch(error => next(error));
};
