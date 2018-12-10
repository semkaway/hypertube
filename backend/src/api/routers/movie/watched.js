import multiple from "./models/multipleMovies";
import axios from "axios";

export const watched = (req, res, next) => {
    multiple(req.user.watchedIds, req.user.locale)
        .then(axios.spread((...movies) => {
            movies = movies.map(movie => ({
                id: movie.data.id,
                poster_path: movie.data.poster_path,
            }));
            res.status(200).json({
                "success": true,
                "movies": movies,
            })
        }))
        .catch(next);
};
