import OS from 'opensubtitles-api'

const srt2vtt = require('srt-to-vtt')
const fs = require('fs')
const pump = require('pump')
const axios 	= require('axios');
const mkdirp = require('mkdirp');

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    username: 'neznamv',
    password: 'hypertube',
    ssl: true
});

// const getToken = async () => {
//     const response = await OpenSubtitles.login();

//     return response.token
// }

export const subtitle = async (req, res, next) => {
    // const token = await getToken()
    var imdbid = req.body.imdbid

    const SUBTITLE_STORAGE = '/tmp/hypertube/subtitle/'
    await mkdirp(SUBTITLE_STORAGE, function (err) {
        if (err) console.error(err)
        else console.log(SUBTITLE_STORAGE, 'folder created')
    });

    const resp = await OpenSubtitles.search({
        // "limit":"all", 
        imdbid
    })
    // TODO => change resp.en to resp[locale] from USER setting. Get from JWT token
    let srtDownloadUrl = resp.en.url

    const response = await axios({
        method: 'GET',
        url: srtDownloadUrl,
        responseType: 'stream'
    })

    var subtitleFile = SUBTITLE_STORAGE + resp.en.filename
    subtitleFile = subtitleFile.replace('.srt', '.vtt')

    const localFileWriteStream = fs.createWriteStream(subtitleFile);

    localFileWriteStream.on("open", () => {
        pump(response.data, srt2vtt(), localFileWriteStream, (err) => {
            if (err) {
                console.log(`${file.name} pipe closed with error:`);
                console.error(err);
                res.sendStatus(500);
            }
        });
    });

    // console.log("resp => ", resp)
    // console.log("en => ", resp.en)

    const NGINX = "http://localhost:8013"
    res.status(200).json({
        "success": true,
        "file": NGINX+subtitleFile
    });
}
