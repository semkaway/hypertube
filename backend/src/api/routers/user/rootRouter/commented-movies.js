import axios from 'axios';
import multiple from '../../movie/models/multipleMovies';

export const commentedMovies = model => (req, res, next) => {
    model.findById(req.params.id)
        .then(user => {
            if (user === null || user.activated === false) {
                return res.status(200).json({"success": false, "message": "Invalid id"});
            }
            const body = (({first, last, image}) =>
                ({first, last, image}))(user);

            multiple(user.commentedIds, user.locale)
                .then(axios.spread((...movies) => {
                    movies = movies.map(movie => ({
                        id: movie.data.id,
                        poster_path: movie.data.poster_path,
                    }));
                    res.status(200).json({
                        "success": true,
                        "movies": movies,
                        ...body,
                    })
                }))
                .catch(next);
        })
        .catch(next);
};
