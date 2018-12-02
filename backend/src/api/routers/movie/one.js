import axios from 'axios'

const getComments = (model, movieId) =>
    model.aggregate({$unwind: "$comments"},
        {$match: {"comments.movieId": movieId}},
        {$sort: {'comments.date': -1}},
        {
            $project: {
                '_id': 0,
                'user_id': '$_id',
                'first': 1,
                'image': 1,
                'date': '$comments.date',
                'text': '$comments.text',
            }
        }
    );

const getMovieData = (locale, movieId) =>
    axios.get('https://api.themoviedb.org/3/movie/' + movieId, {
        params: {
            api_key: '09665afd54623c9413c3f9336484b01c',
            language: locale,
            append_to_response: 'videos,images,credits,similar,recommendations'
        }
    });

const getTorrents = imdb_id => axios.get('https://tv-v2.api-fetch.website/movie/' + imdb_id);

export const one = model => (req, res, next) => {
    getComments(model, req.params.id)
        .then(comments =>
            getMovieData(req.user.locale, req.params.id)
                .then(movie =>
                    getTorrents(movie.data.imdb_id)
                        .then(torrent => {
                            res.status(200).json({
                                "success": true,
                                "data": {
                                    ...movie.data,
                                    'torrent': torrent.data,
                                    'comments': comments,
                                }
                            });
                        })
                        .catch(error => next(error)))
                .catch(error => next(error)))
        .catch(error => next(error));
};
