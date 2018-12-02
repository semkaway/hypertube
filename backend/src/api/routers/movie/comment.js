import {checkForUndefined, errorFields} from "../user/models";

export const comment = (req, res, next) => {
    let error = errorFields('Missing', checkForUndefined({
        movieId: req.body.movieId, text: req.body.text
    }));
    if (error !== '') {
        throw new Error(error);
    }
    if (req.body.text.trim() === '' || req.body.text.length > 1000) {
        return res.status(200).json({"success": false, "message": "Invalid text"});
    }
    const now = new Date();
    req.user.comments.push({
        movieId: req.body.movieId,
        date: now,
        text: req.body.text,
    });
    req.user.save()
        .then(() => res.status(200).json({"success": true, "date": now}))
        .catch(error => next(error));
};
