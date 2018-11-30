export const watched = (req, res) => {
    res.status(200).json({
        "success": true,
        "watchedIds": req.user.watchedIds
    });
};
