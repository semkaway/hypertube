import axios from 'axios'

export const one = model => (req, res, next) => {
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return res.status(200).json({
                    "success": false,
                    "message": 'Invalid token'
                });
            }
            model.aggregate({$unwind: "$comments"},
                {$match: {"comments.movieId": req.params.id}},
                {$sort: {'comments.date': -1}},
                {
                    $project: {
                        '_id': 0,
                        'id': '$_id',
                        'first': 1,
                        'image': 1,
                        'date': '$comments.date',
                        'text': '$comments.text',
                    }
                }
            )
                .then(comments =>
                    axios.get('https://api.themoviedb.org/3/movie/' + req.params.id, {
                        params: {
                            api_key: '09665afd54623c9413c3f9336484b01c',
                            language: user.locale,
                            append_to_response: 'videos,images,credits,similar,recommendations'
                        }
                    })
                        .then(movie =>
                            axios.get('https://tv-v2.api-fetch.website/movie/' + movie.data.imdb_id)
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
        })
        .catch(error => next(error));
};
