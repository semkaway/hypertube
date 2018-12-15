import axios from 'axios'
import { getSubtitle } from './subtitle'

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

export const one = model => async (req, res, next) => {
    try {
        console.log('getComments')
        let comments = await getComments(model, req.params.id);
        console.log('getMovieData')
        let movie = await getMovieData(req.user.locale, req.params.id);
        console.log('getTorrents')
        let torrent = await getTorrents(movie.data.imdb_id);
        console.log('getSubtitle')
        let subtitle_array = await getSubtitle(movie.data.imdb_id, req.user.locale);

        res.status(200).json({
            "success": true,
            "data": {
                 ...movie.data,
                  'torrent': torrent.data,
                  'comments': comments,
                  subtitle_array,
            }
        });
    } catch (e) {
        next(e)
    }

};
