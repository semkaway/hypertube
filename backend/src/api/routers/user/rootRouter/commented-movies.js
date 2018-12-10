export const commentedMovies = model => (req, res, next) => {
    model.findById(req.params.id)
        .then(user => {
            if (user === null || user.activated === false) {
               return res.status(200).json({"success": false, "message": "Invalid id"});
            }
            res.status(200).json({
                "success": true,
                "movieIds": user.commentedIds
            })
        })
        .catch(next);
};
