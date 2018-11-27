export const watched = model => (req, res, next) => {
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return res.status(200).json({
                    "success": false,
                    "message": 'Invalid token'
                });
            }
            res.status(200).json({
                "success": true,
                "watchedIds": user.watchedIds
            });
        })
        .catch(error => next(error));
};
