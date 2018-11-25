import express from "express";
import torrentStream from "torrent-stream"

export const streamRouter = express.Router();

streamRouter.route('/:magnet').get((req, res) => {
    const engine = torrentStream(req.params.magnet);
    engine.on('ready', () => {
        const video = engine.files.reduce((f1, f2) => f1.length > f2.length ? f1 : f2);
        const range = req.headers.range ? req.headers.range.substring(6).split('-') : [0, video.length - 1];
        const start = parseInt(range[0]),
              end = parseInt(range[1] || video.length - 1);
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${video.length}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': 'video/mp4'
        });
        video.createReadStream({start: start, end: end}).pipe(res);
    });
});
