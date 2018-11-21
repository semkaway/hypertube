export const image = model => (req, res, next) => {
    if (req.body.image === undefined) {
        throw new Error("Require 'image' field");
    }
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return res.status(200).json({"success": false, "message": 'Invalid token'});
            }
            user.image = req.body.image;
            user.save().then(() => res.status(201).json({"success": true}))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
