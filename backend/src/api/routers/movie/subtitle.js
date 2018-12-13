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

const NGINX = "http://localhost:8013"
const SUBTITLE_STORAGE = '/tmp/hypertube/subtitle/'

const getFile = async (srtDownloadUrl, filename) => {
    // download srt and convert it into vtt file
    const response = await axios({
        method: 'GET',
        url: srtDownloadUrl,
        responseType: 'stream'
    })

    var subtitleFile = SUBTITLE_STORAGE + filename
    subtitleFile = subtitleFile.replace('.srt', '.vtt')

    const localFileWriteStream = fs.createWriteStream(subtitleFile);

    localFileWriteStream.on("open", () => {
        pump(response.data, srt2vtt(), localFileWriteStream, (err) => {
            if (err) {
                return 'error'
            }
        });
    });

    let file = NGINX+subtitleFile

    return file
}

export const getSubtitle = async (imdbid, locale) => {
    await mkdirp(SUBTITLE_STORAGE, function (err) {
        if (err) console.error(err)
        else console.log(SUBTITLE_STORAGE, 'folder created')
    });

    const resp = await OpenSubtitles.search({
        // "limit":"all", 
        imdbid
    })

    if (resp.en) {
        var enSubs = {
            locale: "en",
            srtDownloadUrl: resp.en.url,
            file: await getFile(resp.en.url, resp.en.filename)
        }
    }

    if (resp.ru) {
        var ruSubs = {
            locale: "ru",
            srtDownloadUrl: resp.ru.url,
            file: await getFile(resp.ru.url, resp.ru.filename)
        }
    }
    var subsArray = {enSubs, ruSubs}
    return subsArray
}
