import torrentStream from "torrent-stream"
import axios from "axios";
import jwt from "jsonwebtoken";

const startStreaming = (req, res, magnet) => {
    const engine = torrentStream(magnet);
    engine.on('ready', () => {
        const video = engine.files.reduce((f1, f2) => f1.length > f2.length ? f1 : f2);
        const range = req.headers.range ? req.headers.range.substring(6).split('-') : [0, video.length - 1];
        const start = parseInt(range[0]),
              end   = parseInt(range[1] || video.length - 1);
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${video.length}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': 'video/mp4'
        });
        video.createReadStream({start: start, end: end}).pipe(res);
    });
};

export const stream = model => (req, res, next) => {
    const config = req.app.get('config');
    if (req.query.token === undefined) {
        throw new Error("Require 'token' param");
    }
    if (req.query.quality === undefined) {
        throw new Error("Require 'quality' param");
    }
    jwt.verify(req.query.token, config.secrets.jwt, (error, decoded) => {
        if (error) {
            if (error.message === 'invalid token') {
                return res.status(200).json({"success": false, "message": 'Invalid token'});
            }
            return next(error);
        }
        model.findById(decoded.id)
            .then(user => {
                if (user === null || user.activated === false) {
                    return res.status(200).json({"success": false, "message": 'Invalid token'});
                }
                axios.get('https://api.themoviedb.org/3/movie/' + req.params.id,
                    {params: {api_key: '09665afd54623c9413c3f9336484b01c'}})
                    .then(movie => {
                        console.log('API movie request =>', 'https://tv-v2.api-fetch.website/movie/' + movie.data.imdb_id)
                        axios.get('https://tv-v2.api-fetch.website/movie/' + movie.data.imdb_id)
                            .then(torrent => {
                                if (torrent.data === '') {
                                    return res.status(200).json({"success": false, "message": 'No film'});
                                }
                                if (torrent.data.torrents.en[req.query.quality] === undefined) {
                                    return res.status(200).json({"success": false, "message": 'Invalid quality'});
                                }
                                const magnet = torrent.data.torrents.en[req.query.quality].url;

                                user.watchedMovies[magnet.match(/btih:(.+?)&/)[1].toLowerCase()] = {
                                    'movieId': req.params.id,
                                    'date': new Date()
                                };
                                user.markModified('watchedMovies');
                                user.save()
                                    .then(() => startStreaming(req, res, magnet))
                                    .catch(next);
                            })
                            .catch(next)}
                    )
                    .catch(next);
            })
            .catch(next);
    });
};
