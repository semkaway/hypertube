import OS from 'opensubtitles-api'

const srt2vtt = require('srt-to-vtt')
const fs = require('fs')
const pump = require('pump')
const axios 	= require('axios');

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    username: 'neznamv',
    password: 'hypertube',
    ssl: true
});

const getToken = async () => {
    const response = await OpenSubtitles.login();

    return response.token
}

export const subtitle = async (req, res, next) => {
    
    const token = await getToken()
    const imdbid = "tt0095016"

    const resp = await OpenSubtitles.search({
        // "limit":"all", 
        imdbid
    })
    let srtDownloadUrl = resp.en.url

    const response = await axios({
        method: 'GET',
        url: srtDownloadUrl,
        responseType: 'stream'
    })


    // console.log("data =>", response.responseUrl)

    const localFileWriteStream = fs.createWriteStream(resp.en.filename);

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

    res.status(200).json({
        "success": true,
        "token": token,
        "url": resp.en.url
    });
}
